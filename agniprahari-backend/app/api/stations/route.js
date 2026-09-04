import { getConnection, corsHeaders } from '../../../lib/db.js';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  let conn;
  try {
    conn = await getConnection();

    // const result = await conn.execute(
    //   `SELECT station_id, station_name, address, contact_number, station_status
    //    FROM fire_station
    //    ORDER BY station_name`
    // );


    const result = await conn.execute(
  `SELECT fs.station_id, fs.station_name, fs.address, fs.station_status,
          sc.contact.phone AS contact_number,
          sc.contact.email AS contact_email
   FROM fire_station fs
   JOIN station_contact sc ON sc.station_id = fs.station_id
   ORDER BY fs.station_name`
);

    return Response.json({ stations: result.rows }, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
  } finally {
    if (conn) await conn.close();
  }
}