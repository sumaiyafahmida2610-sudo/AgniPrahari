import { getConnection, corsHeaders } from "@/lib/db";

export async function POST(req) {
    let connection;

    try {
        const body = await req.json();

        const {
            complaint_id,
            citizen_id,
            station_id,
            training_id,
            training_type,
            complaint_text,
            assignment_id
        } = body;


        connection = await getConnection();


        await connection.execute(
            `
            BEGIN
                proc_insert_org_feedback(
                    :complaint_id,
                    :citizen_id,
                    :station_id,
                    :training_id,
                    :training_type,
                    :complaint_text,
                    :assignment_id
                );
            END;
            `,
            {
                complaint_id,
                citizen_id,
                station_id,
                training_id,
                training_type,
                complaint_text,
                assignment_id
            }
        );


        await connection.commit();


        return Response.json(
            {
                success: true,
                message: "Feedback submitted successfully"
            },
            {
                headers: corsHeaders
            }
        );


    } catch (err) {

        console.error(err);


        return Response.json(
            {
                success: false,
                error: err.message
            },
            {
                status: 500,
                headers: corsHeaders
            }
        );


    } finally {

        if (connection) {
            await connection.close();
        }

    }
}

export async function OPTIONS() {
    return new Response(null, {
        headers: corsHeaders
    });
}