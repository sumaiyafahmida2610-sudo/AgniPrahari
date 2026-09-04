import oracledb from 'oracledb';
import { getConnection, corsHeaders } from '../../../../lib/db.js';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  let conn;
  try {
    conn = await getConnection();

    // const pendingResult = await conn.execute(
    //   `SELECT c.complaint_id, c.complaint_date, em.incident_type, em.fire_size,
    //           em.building_type, em.trapped_person_count, em.incident_status,
    //           em.area, em.detailed_location,
    //           ci.full_name AS citizen_name, ci.phone_no,
    //           g.citizen_id, g.assignment_id
    //    FROM complaint c
    //    JOIN emergency em ON em.complaint_id = c.complaint_id
    //    JOIN gives g ON g.complaint_id = c.complaint_id
    //    JOIN citizen ci ON ci.citizen_id = g.citizen_id
    //    WHERE c.status = 'Pending'
    //    ORDER BY c.complaint_date`
    // );


    const pendingResult = await conn.execute(
  `SELECT * FROM v  cd _emergency_full_details
   WHERE status = 'Pending'
   ORDER BY complaint_date`
);

    const pendingReports = pendingResult.rows;

    for (const report of pendingReports) {
      const procResult = await conn.execute(
        `BEGIN
           pkg_dispatch_requirements.get_capable_stations(:complaintId, :cursor);
         END;`,
        {
          complaintId: report.COMPLAINT_ID,
          cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
        }
      );

      const resultSet = procResult.outBinds.cursor;
      const stationRows = await resultSet.getRows();
      await resultSet.close();

      report.STATIONS = stationRows.map((row) => ({
        STATION_ID: row.STATION_ID,
        STATION_NAME: row.STATION_NAME,
        PRIORITY_RANK: row.PRIORITY_RANK,
      }));
    }

    return Response.json({ pendingReports }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
  } finally {
    if (conn) await conn.close();
  }
}