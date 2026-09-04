import { useState } from "react";

const STATIONS = [
  {
    name: "Mirpur Central",
    id: "FS001",
  },
  {
    name: "Motijheel HQ",
    id: "FS002",
  },
  {
    name: "Uttara Station",
    id: "FS003",
  },
  {
    name: "Dhanmondi Sub",
    id: "FS004",
  },
  {
    name: "Gulshan Station",
    id: "FS005",
  },
  {
    name: "Banani Station",
    id: "FS006",
  },
];


export default function GeneralComplaint({
  title,
  idLabel,
  onBackHome
}) {


  const [complaintMode,setComplaintMode] = useState(null);

  const [citizenId,setCitizenId] = useState("");

  const [trainingId,setTrainingId] = useState("");

  const [station,setStation] = useState(STATIONS[0]);

  const [message,setMessage] = useState("");

  const [error,setError] = useState("");

  const [success,setSuccess] = useState(false);


  const handleSubmit = async(e)=>{
    console.log("SUBMIT CLICKED");

    e.preventDefault();


    setError("");


    if(!citizenId.trim()){
      setError(`${idLabel} is required.`);
      return;
    }


    if(complaintMode==="organization" && !trainingId.trim()){
      setError("Training ID is required.");
      return;
    }


    if(!message.trim()){
      setError("Please describe your complaint.");
      return;
    }



    try{

      console.log({
    complaint_type: complaintMode,
    citizen_id: citizenId,
    training_id: trainingId
});


      const response = await fetch(
        "http://localhost:3000/api/complaint",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },


          body:JSON.stringify({

            complaint_type:complaintMode,

            citizen_id:citizenId.trim(),

            station_id:station.id,

            training_id:
              complaintMode==="organization"
              ? trainingId.trim()
              : null,

            complaint_text:message.trim()

          })

        }
      );



      const data = await response.json();



      if(!data.success){

        setError(data.message);

        return;

      }


      setSuccess(true);


    }

    catch(err){

      console.error(err);

      setError(
        "Something went wrong. Please try again."
      );

    }

  };




  if(!complaintMode){

    return (

      <div style={styles.page}>

        <header style={styles.nav}>

          <div style={styles.logo}>
            AGNI<span style={{color:"#E63927"}}>
              PRAHARI
            </span>
          </div>


          <button
          style={styles.backLink}
          onClick={onBackHome}
          >
            ← Back to Home
          </button>


        </header>



        <div style={styles.wrap}>

          <div style={styles.card}>


            <h1 style={styles.title}>
              Select Complaint Type
            </h1>


            <p style={styles.subtitle}>
              Choose the type of complaint you want to submit.
            </p>



            <button
            style={styles.primaryBtn}
            onClick={()=>{
              setComplaintMode("general");
            }}
            >
              General Complaint
            </button>



            <button
            style={{
              ...styles.primaryBtn,
              marginTop:"15px"
            }}

            onClick={()=>{
              setComplaintMode("organization");
            }}
            >
              Organizational Complaint
            </button>


          </div>

        </div>

      </div>

    );

  }





  if(success){

    return(

      <div style={styles.page}>


        <div style={styles.successCard}>


          <div style={styles.successIcon}>
            ✓
          </div>


          <h2 style={styles.successTitle}>
            Complaint Submitted
          </h2>


          <p style={styles.successText}>
            Your complaint has been recorded and will be reviewed shortly.
          </p>



          <button
          style={styles.primaryBtn}
          onClick={onBackHome}
          >
            Back to Home
          </button>



        </div>


      </div>

    );

  }




return (

<div style={styles.page}>


<header style={styles.nav}>


<div style={styles.logo}>
AGNI<span style={{color:"#E63927"}}>
PRAHARI
</span>
</div>



<button
style={styles.backLink}
onClick={onBackHome}
>
← Back to Home
</button>


</header>



<div style={styles.wrap}>


<div style={styles.card}>


<h1 style={styles.title}>
{
complaintMode==="general"
?
"General Complaint"
:
"Organizational Complaint"
}
</h1>



<p style={styles.subtitle}>
Describe your issue and submit your complaint.
</p>



{error &&
<div style={styles.errorBox}>
{error}
</div>
}



<form
onSubmit={handleSubmit}
style={styles.form}
>



<div style={styles.field}>


<label style={styles.label}>
Citizen ID *
</label>


<input

style={styles.input}

value={citizenId}

onChange={(e)=>{
setCitizenId(e.target.value);
}}

placeholder="Enter citizen ID"

/>


</div>





{
complaintMode==="organization" &&

<div style={styles.field}>


<label style={styles.label}>
Training ID *
</label>


<input

style={styles.input}

value={trainingId}

onChange={(e)=>{
setTrainingId(e.target.value);
}}

placeholder="Enter requested training ID"

/>


</div>

}






<div style={styles.field}>


<label style={styles.label}>
Station Name
</label>



<select

style={styles.input}

value={station.id}

onChange={(e)=>{

const selected =
STATIONS.find(
s=>s.id===e.target.value
);

setStation(selected);

}}

>


{
STATIONS.map((s)=>(

<option
key={s.id}
value={s.id}
>
{s.name}
</option>

))
}


</select>


</div>







<div style={styles.field}>


<label style={styles.label}>
Complaint Details
</label>



<textarea

style={{
...styles.input,
...styles.textarea
}}

value={message}

onChange={(e)=>{
setMessage(e.target.value);
}}

placeholder="Describe your complaint in detail..."

rows={12}

/>


</div>




<button
type="submit"
style={styles.primaryBtn}
>
Submit Complaint
</button>



</form>



</div>


</div>


</div>


);


}






const styles = {

page:{
fontFamily:"'Inter',sans-serif",
background:"#17171A",
color:"#F5F3EF",
minHeight:"100vh"
},


nav:{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"20px 40px",
borderBottom:"1px solid #2A2A2E"
},


logo:{
fontFamily:"'Barlow Condensed',sans-serif",
fontSize:"26px",
fontWeight:700,
letterSpacing:"1px"
},


backLink:{
background:"transparent",
border:"1px solid #3A3A40",
color:"#F5F3EF",
padding:"8px 16px",
borderRadius:"6px",
cursor:"pointer"
},


wrap:{
display:"flex",
justifyContent:"center",
padding:"60px 32px"
},


card:{
background:"#1E1E22",
border:"1px solid #2A2A2E",
borderRadius:"12px",
padding:"40px",
width:"100%",
maxWidth:"720px"
},


title:{
fontFamily:"'Barlow Condensed',sans-serif",
fontSize:"30px",
fontWeight:700
},


subtitle:{
color:"#9A9AA2",
fontSize:"14px",
marginBottom:"28px"
},


form:{
display:"flex",
flexDirection:"column",
gap:"18px"
},


field:{
display:"flex",
flexDirection:"column",
gap:"6px"
},


label:{
fontSize:"13px",
fontWeight:600,
color:"#D8D8DE"
},


input:{
background:"#0E0E10",
border:"1px solid #3A3A40",
borderRadius:"6px",
padding:"12px 14px",
color:"#F5F3EF",
fontSize:"14px"
},


textarea:{
resize:"vertical",
minHeight:"260px"
},


errorBox:{
background:"rgba(230,57,39,0.1)",
border:"1px solid rgba(230,57,39,0.4)",
color:"#FF8577",
padding:"12px",
borderRadius:"8px"
},


primaryBtn:{
background:"#E63927",
color:"#fff",
border:"none",
padding:"14px 26px",
borderRadius:"6px",
fontWeight:600,
cursor:"pointer",
fontSize:"15px"
},


successCard:{
maxWidth:"420px",
margin:"100px auto",
textAlign:"center",
background:"#1E1E22",
border:"1px solid #2A2A2E",
borderRadius:"12px",
padding:"48px 32px"
},


successIcon:{
width:"56px",
height:"56px",
borderRadius:"50%",
background:"rgba(61,209,111,0.15)",
color:"#3DD16F",
fontSize:"28px",
display:"flex",
alignItems:"center",
justifyContent:"center",
margin:"0 auto 20px"
},


successTitle:{
fontSize:"26px"
},


successText:{
color:"#9A9AA2",
marginBottom:"24px"
}

};