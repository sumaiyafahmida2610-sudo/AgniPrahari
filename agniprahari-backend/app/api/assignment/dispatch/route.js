import { getConnection, corsHeaders } from '../../../../lib/db.js';
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  const body = await request.json();
  const { stationId, citizenId, complaintId, assignmentId } = body;

  let conn;
  try {
    conn = await getConnection();

    await conn.execute(
      `INSERT INTO assigns (station_id, citizen_id, complaint_id, assignment_id)
       VALUES (:stationId, :citizenId, :complaintId, :assignmentId)`,
      { stationId, citizenId, complaintId, assignmentId }
    );

    await conn.execute(
      `UPDATE complaint SET status = 'In Progress' WHERE complaint_id = :complaintId`,
      { complaintId }
    );
    

    await conn.execute(
  `UPDATE emergency SET incident_status = 'Dispatched' WHERE complaint_id = :complaintId`,
  { complaintId }
);
    await conn.commit();

    return Response.json({ message: 'Station dispatched successfully' }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    if (conn) await conn.rollback();
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
  } finally {
    if (conn) await conn.close();
  }
}