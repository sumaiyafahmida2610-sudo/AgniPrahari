import { getConnection, corsHeaders } from "@/lib/db";


export async function POST(req){

    let connection;


    try{


        const body = await req.json();


        const {
            complaint_type,
            citizen_id,
            station_id,
            training_id,
            complaint_text
        } = body;



        connection = await getConnection();



        // ORGANIZATIONAL COMPLAINT
        if(complaint_type === "organization"){


            const result = await connection.execute(
                `
                SELECT COUNT(*) AS CNT
                FROM request
                WHERE citizen_id = :citizen_id
                AND training_id = :training_id
                `,
                {
                    citizen_id,
                    training_id
                }
            );


            console.log(
                "REQUEST CHECK:",
                result.rows
            );


            if(Number(result.rows[0].CNT) === 0){


                return Response.json(
                    {
                        success:false,
                        message:
                        "Complaint cannot be submitted because you have not requested this training."
                    },
                    {
                        status:400,
                        headers:corsHeaders
                    }
                );

            }



            const complaintId =
                "CMP" + Date.now();


            const assignmentId =
                "ASG" + Date.now();



            await connection.execute(
                `
                BEGIN

                proc_insert_org_feedback(
                    :complaint_id,
                    :citizen_id,
                    :station_id,
                    :training_id,
                    'fire safety training',
                    :complaint_text,
                    :assignment_id
                );

                END;
                `,
                {
                    complaint_id: complaintId,
                    citizen_id,
                    station_id,
                    training_id,
                    complaint_text,
                    assignment_id: assignmentId
                }
            );

        }



        // GENERAL COMPLAINT
        else{


            const complaintId =
                "CMP" + Date.now();



            await connection.execute(
                `
                INSERT INTO complaint
                (
                    complaint_id,
                    complaint_date,
                    status
                )
                VALUES
                (
                    :id,
                    TRUNC(SYSDATE),
                    'Pending'
                )
                `,
                {
                    id: complaintId
                }
            );



            await connection.execute(
                `
                INSERT INTO general_feedback
                (
                    complaint_id,
                    station_id,
                    complaint_text
                )
                VALUES
                (
                    :id,
                    :station,
                    :text
                )
                `,
                {
                    id: complaintId,
                    station: station_id,
                    text: complaint_text
                }
            );

        }



        await connection.commit();



        return Response.json(
            {
                success:true,
                message:"Complaint submitted successfully"
            },
            {
                headers:corsHeaders
            }
        );


    }



    catch(error){


        console.error(error);


        return Response.json(
            {
                success:false,
                message:error.message
            },
            {
                status:500,
                headers:corsHeaders
            }
        );


    }



    finally{

        if(connection){
            await connection.close();
        }

    }

}



export async function OPTIONS(){

    return new Response(null,{
        headers:corsHeaders
    });

}