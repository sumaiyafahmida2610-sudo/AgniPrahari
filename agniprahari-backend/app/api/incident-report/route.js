
import { getConnection, corsHeaders } from '../../../lib/db.js';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

function generateId(prefix) {
  return prefix + Date.now() + Math.floor(Math.random() * 1000);
}

function generatePassword() {
  return Math.random().toString(36).slice(-10);
}

export async function POST(request) {
  const body = await request.json();
  const {
    name, phone, area, detailedLocation,
    incidentType, fireSize, trappedCount, buildingType,
  } = body;

  let conn;
  try {
    conn = await getConnection();

    const existing = await conn.execute(
      `SELECT citizen_id FROM citizen WHERE phone_no = :phone`,
      { phone }
    );

    let citizenId;
    if (existing.rows.length > 0) {
      citizenId = existing.rows[0].CITIZEN_ID;
    } else {
      citizenId = generateId('CIT');
      await conn.execute(
        `INSERT INTO citizen (citizen_id, full_name, phone_no, password, address, registration_date)
         VALUES (:citizenId, :name, :phone, :password, :address, SYSDATE)`,
        { citizenId, name, phone, password: generatePassword(), address: area }
      );
    }

    const complaintId = generateId('CMP');
    await conn.execute(
      `INSERT INTO complaint (complaint_id, complaint_date, status)
       VALUES (:complaintId, SYSDATE, 'Pending')`,
      { complaintId }
    );

    await conn.execute(
      `INSERT INTO emergency
         (complaint_id, report_time, incident_type, fire_size, building_type, trapped_person_count, area, detailed_location, incident_status)
       VALUES
         (:complaintId, SYSTIMESTAMP, :incidentType, :fireSize, :buildingType, :trappedCount, :area, :detailedLocation, 'Reported')`,
      {
        complaintId,
        incidentType,
        fireSize: fireSize || null,
        buildingType: buildingType || null,
        trappedCount: trappedCount ? Number(trappedCount) : 0,
        area,
        detailedLocation,
      }
    );

    const assignmentId = generateId('ASG');
    await conn.execute(
      `INSERT INTO assignment (assignment_id, request_time)
       VALUES (:assignmentId, SYSTIMESTAMP)`,
      { assignmentId }
    );

    await conn.execute(
      `INSERT INTO gives (citizen_id, complaint_id, assignment_id)
       VALUES (:citizenId, :complaintId, :assignmentId)`,
      { citizenId, complaintId, assignmentId }
    );

    await conn.commit();

    return Response.json(
      { message: 'Report submitted successfully', complaintId },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error(err);
    if (conn) await conn.rollback();
    return Response.json(
      { error: err.message },
      { status: 500, headers: corsHeaders }
    );
  } finally {
    if (conn) await conn.close();
  }
}