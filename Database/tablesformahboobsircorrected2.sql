CREATE TABLE citizen (
     
    
    citizen_id         VARCHAR2(50) ,                   
    nid_number         VARCHAR2(20) ,
    full_name          VARCHAR2(120) NOT NULL,
    phone_no           VARCHAR2(20) NOT NULL,
    email              VARCHAR2(150) ,
    password      VARCHAR2(100) NOT NULL,
    address           VARCHAR2(300) NOT NULL,
   dob DATE,
    registration_date  DATE ,
    CONSTRAINT pk_citizen PRIMARY KEY (citizen_id),
    CONSTRAINT uq_citizen_nid UNIQUE (nid_number),
    CONSTRAINT uq_citizen_phone UNIQUE (phone_no),
    CONSTRAINT uq_citizen_email UNIQUE (email)
);
CREATE TABLE Fire_Station (
    Station_ID       VARCHAR2(50) CONSTRAINT pk_fire_station PRIMARY KEY,
    Station_Name     VARCHAR2(100) NOT NULL,
        Address          VARCHAR2(200) NOT NULL,
    Latitude         NUMBER(10,7),
    Longitude        NUMBER(10,7),
    Station_Status   VARCHAR2(20),
    Contact_Number   VARCHAR2(15)

   );

CREATE TABLE location (
    
    area                VARCHAR2(100),
    priority_1          VARCHAR2(50) NOT NULL,
    priority_2          VARCHAR2(50),
    priority_3          VARCHAR2(50),
    CONSTRAINT pk_location PRIMARY KEY (area)

);







CREATE TABLE Assignment (
    Assignment_ID           VARCHAR2(50) CONSTRAINT assignment_pk PRIMARY KEY,
    Request_Time            TIMESTAMP NOT NULL,
    Required_Truck          NUMBER DEFAULT 3,
    Required_Fire_Fighters  NUMBER DEFAULT 10,
    Required_Equipments     NUMBER DEFAULT 10,
    Assignment_Status       VARCHAR2(20) DEFAULT 'Pending',
    Accept_Time             TIMESTAMP,
   
    CONSTRAINT chk_assignment_status
        CHECK (Assignment_Status IN
        ('Pending', 'Accepted', 'On going', 'Completed', 'Cancelled'))

    );



CREATE TABLE employee (
    employee_id    VARCHAR2(50)  ,
    salary         NUMBER DEFAULT 0,
    name           VARCHAR2(120) NOT NULL,
    designation    VARCHAR2(80) NOT NULL,
    address        VARCHAR2(300) NOT NULL,
    contact_no     VARCHAR2(20) NOT NULL,
    email          VARCHAR2(50) NOT NULL,
    NID            VARCHAR2(50) NOT NULL,
   GENDER          VARCHAR2(10) NOT NULL,
   BLOOD_GROUP     VARCHAR2(10) NOT NULL,
    DATE_OF_BIRTH  DATE NOT NULL,
    assignment_id  VARCHAR2(50),
    JOINED_DATE   DATE NOT NULL,
    YEARS_OF_EXPERIENCE  NUMBER DEFAULT 0,
    PREFERED_SHIFT       VARCHAR2(10),
    TRAINING          VARCHAR2(100),
    EMERGENCY_PHONE    VARCHAR2(20),
    EMERGENCY_CONTACT_NAME  VARCHAR2(20),
    PASSWORD   VARCHAR2(30),
   availability_status    VARCHAR2(20) DEFAULT 'AVAILABLE',
    
    
   
   
   
    CONSTRAINT pk_employee PRIMARY KEY (employee_id),
    CONSTRAINT uq_employee_contact UNIQUE (contact_no),
CONSTRAINT uq_employee_email UNIQUE (email),
    CONSTRAINT fk_employee_assignment FOREIGN KEY (assignment_id)
        REFERENCES assignment (assignment_id),
    CONSTRAINT ck_employee_salary CHECK (salary >= 0),
    CONSTRAINT uq_employee_NID UNIQUE (NID),
    CONSTRAINT ck_availability
        CHECK (availability_status IN
            ('AVAILABLE', 'ASSIGNED', 'ON_LEAVE', 'OFF_DUTY'))

);


CREATE TABLE MEDICAL_CONDITION(

employee_id VARCHAR2(50),
name_of_disease  VARCHAR2(50),

 CONSTRAINT Fk_firefighter_condition FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE,
  CONSTRAINT pk_firefighter_condition PRIMARY KEY (employee_id, name_of_disease)


);


CREATE TABLE complaint (
    complaint_id      varchar2(50),
    
    complaint_date      DATE NOT NULL,
    Status            VARCHAR2(20) DEFAULT 'Pending',
    CONSTRAINT pk_complaint PRIMARY KEY (complaint_id),
     CONSTRAINT chk_complaint_status
        CHECK (Status IN ('Pending', 'Resolved', 'Rejected', 'In Progress'))
        
);



CREATE TABLE emergency (
    complaint_id        varchar2(50) ,
   
   
    verification_status VARCHAR2(30),
    report_time        TIMESTAMP NOT NULL,
    incident_type      VARCHAR2(50) NOT NULL,
    fire_size          VARCHAR2(20),
        building_type        VARCHAR2(50),
    trapped_person_count  NUMBER DEFAULT 0,
    incident_status       VARCHAR2(30),

CONSTRAINT pk_emergency PRIMARY KEY (complaint_id),

    CONSTRAINT fk_emergency_complaint FOREIGN KEY (complaint_id)
        REFERENCES complaint (complaint_id) ON DELETE CASCADE

        
);


CREATE TABLE general_feedback (
    
    complaint_id        varchar2(50),
    station_id          varchar2(50),
    complaint_text      VARCHAR2(1000),

   CONSTRAINT pk_generalfeedback PRIMARY KEY (complaint_id), 
   
    CONSTRAINT fk_feedback_complaint FOREIGN KEY (complaint_id)
        REFERENCES complaint (complaint_id) ON DELETE CASCADE
    
);


CREATE TABLE org_feedback (
    
    complaint_id        varchar2(50),
    station_id          varchar2(50),
    training_id         varchar2(50),
    training_type       varchar2(50),
    complaint_text      VARCHAR2(1000),

   CONSTRAINT pk_orgfeedback PRIMARY KEY (complaint_id), 


CONSTRAINT chk_complainttraining_type
        CHECK (training_type  IN ('new trainee','fire safety training')),
   
    CONSTRAINT fk_orgfeedback_complaint FOREIGN KEY (complaint_id)
        REFERENCES complaint (complaint_id) ON DELETE CASCADE
    
);


CREATE TABLE equipment (
    equipment_id        VARCHAR2(50),
                        
    station_id          VARCHAR2(50) NOT NULL,
    status              VARCHAR2(20) DEFAULT 'AVAILABLE',
    quantity_available  NUMBER(6) DEFAULT 0 ,
    equipment_name      VARCHAR2(120) NOT NULL,
    quantity_total      NUMBER(6) DEFAULT 0 NOT NULL,
    EARTHQUAKE         VARCHAR2(20) ,
    FLOOD              VARCHAR2(20),
    CYCLONE               VARCHAR2(20),
     FIRE              VARCHAR2(20), 
     RESCUE              VARCHAR2(20), 
     INDUSTRIAL_ACCIDENT             VARCHAR2(20),
     GENERAL             VARCHAR2(20),

    CONSTRAINT pk_equipment PRIMARY KEY (equipment_id),
    CONSTRAINT fk_equipment_station FOREIGN KEY (station_id)
        REFERENCES fire_station (station_id),
    CONSTRAINT ck_equipment_status CHECK
        (status IN ('AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE')),
    CONSTRAINT ck_equipment_quantity CHECK
        (quantity_total >= 0 AND quantity_available >= 0
         AND quantity_available <= quantity_total)
    
);


CREATE TABLE vehicle (
    
   
    equipment_id        VARCHAR2(50) NOT NULL,
   
    
    category            VARCHAR2(50) NOT NULL,
    CONSTRAINT pk_vehicle PRIMARY KEY (equipment_id),
    
    CONSTRAINT fk_vehicle_equipment FOREIGN KEY (equipment_id)
        REFERENCES equipment (equipment_id) ON DELETE CASCADE
    
   
);



CREATE TABLE firefighter (
    employee_id         VARCHAR2(50),
    station_id          VARCHAR2(50) NOT NULL,
    firefighter_rank    VARCHAR2(50) NOT NULL,


    supervisor_id       VARCHAR2(50),

    CONSTRAINT pk_firefighter PRIMARY KEY (employee_id),

    CONSTRAINT fk_firefighter_employee
        FOREIGN KEY (employee_id)
        REFERENCES employee(employee_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_firefighter_station
        FOREIGN KEY (station_id)
        REFERENCES fire_station(station_id) ON DELETE CASCADE,

    CONSTRAINT fk_ff_supervisor
        FOREIGN KEY (supervisor_id)
        REFERENCES firefighter(employee_id)   
);

CREATE TABLE firefighter_skill (
    employee_id       VARCHAR2(50),
    skill_name        VARCHAR2(100),
   
    CONSTRAINT pk_firefighter_skill PRIMARY KEY (employee_id, skill_name),
    CONSTRAINT fk_ff_skill_employee FOREIGN KEY (employee_id)
        REFERENCES firefighter (employee_id) ON DELETE CASCADE
    
);



CREATE TABLE gives (
    citizen_id           VARCHAR2(50)         NOT NULL,
    complaint_id           VARCHAR2(50)         NOT NULL,
    assignment_id             VARCHAR2(50)          NOT NULL,
    
    CONSTRAINT pk_gives PRIMARY KEY (citizen_id, complaint_id, assignment_id),
    CONSTRAINT fk_gives_citizen FOREIGN KEY (citizen_id)
        REFERENCES citizen (citizen_id) ON DELETE CASCADE,
    CONSTRAINT fk_gives_complaint FOREIGN KEY (complaint_id)
        REFERENCES complaint (complaint_id) ON DELETE CASCADE,
    CONSTRAINT fk_gives_assignment FOREIGN KEY (assignment_id)
        REFERENCES assignment (assignment_id) ON DELETE CASCADE
);



CREATE TABLE assigns (
    station_id             VARCHAR2(50)          NOT NULL,
    citizen_id              VARCHAR2(50)          NOT NULL,
    complaint_id              VARCHAR2(50)          NOT NULL,
    assignment_id                VARCHAR2(50)           NOT NULL,
   
    CONSTRAINT pk_assigns PRIMARY KEY (station_id, citizen_id, complaint_id, assignment_id),
    CONSTRAINT fk_assigns_station FOREIGN KEY (station_id)
        REFERENCES fire_station (station_id) ON DELETE CASCADE,
    CONSTRAINT fk_assigns_gives FOREIGN KEY (citizen_id, complaint_id, assignment_id)
        REFERENCES gives (citizen_id, complaint_id, assignment_id) ON DELETE CASCADE
);



CREATE TABLE response_summary (
    response_id          VARCHAR2(50),
    assignment_id        VARCHAR2(50) ,
    arrival_time         TIMESTAMP(6) ,
    fire_controlled_time TIMESTAMP(6),
    completion_time      TIMESTAMP(6),
    trucks_used          NUMBER DEFAULT 0 ,
    firefighters_used    NUMBER DEFAULT 0,
    fatality_count       NUMBER DEFAULT 0,
    injured_count        NUMBER DEFAULT 0,
    property_damaged     NUMBER DEFAULT 0,
    remarks              VARCHAR2(1000),
    CONSTRAINT pk_response_summary PRIMARY KEY (response_id),
    CONSTRAINT uq_response_assignment UNIQUE (assignment_id),
    CONSTRAINT fk_response_assignment FOREIGN KEY (assignment_id)
        REFERENCES assignment (assignment_id) ON DELETE CASCADE,
    CONSTRAINT ck_response_counts CHECK
        (trucks_used >= 0 AND firefighters_used >= 0
         AND fatality_count >= 0 AND injured_count >= 0
         AND property_damaged >= 0),
    CONSTRAINT ck_response_control_time CHECK
        (fire_controlled_time IS NULL
         OR  arrival_time IS NULL OR  fire_controlled_time >= arrival_time ),
    CONSTRAINT ck_response_complete_time CHECK
        (completion_time IS NULL OR arrival_time IS NULL OR completion_time >= arrival_time)
);



CREATE TABLE Training (
    Training_ID     VARCHAR2(50) CONSTRAINT Training_pk PRIMARY KEY,
       Instructor_NAME      VARCHAR2(100) NOT NULL,
    Status          VARCHAR2(20) DEFAULT 'Pending' ,
    Duration        VARCHAR2(50) NOT NULL,

    CONSTRAINT chk_training_status
        CHECK (Status IN ('Pending','Scheduled', 'Ongoing', 'Completed', 'Cancelled'))
);




CREATE TABLE new_trainee (
    
    training_id       VARCHAR2(50) ,
    LOCATION       VARCHAR2(100) NOT NULL,
    TRAINING_NAME  VARCHAR2(100) NOT NULL,
    BUDGET NUMBER NOT NULL,

    
CONSTRAINT pk_new_trainee_training_id primary key(training_id),
       
    CONSTRAINT fk_trainee_training FOREIGN KEY (training_id)
        REFERENCES training (training_id)
ON DELETE CASCADE

);



CREATE TABLE fire_safety_training (
    
    training_id         VARCHAR2(50) ,
    organization_name   VARCHAR2(180) NOT NULL ,
    number_of_people    NUMBER(6) NOT NULL,
    
    CONSTRAINT pk_fire_safety_training PRIMARY KEY (training_id),
    CONSTRAINT fk_safety_training FOREIGN KEY (training_id)
        REFERENCES training (training_id)
ON DELETE CASCADE
,
    CONSTRAINT ck_safety_people CHECK (number_of_people > 0)
);


CREATE TABLE request (
    citizen_id            VARCHAR2(50)        NOT NULL,
    training_id               VARCHAR2(50)         NOT NULL,
    assignment_id              VARCHAR2(50)         NOT NULL,
    year_of_experience    NUMBER   ,
    degree              varchar2(50),
   
    
    CONSTRAINT pk_request PRIMARY KEY (citizen_id, training_id, assignment_id),
    CONSTRAINT fk_request_citizen FOREIGN KEY (citizen_id)
        REFERENCES citizen (citizen_id) ON DELETE CASCADE,
    CONSTRAINT fk_request_training FOREIGN KEY (training_id)
        REFERENCES training (training_id)  ON DELETE CASCADE,
    CONSTRAINT fk_request_assignment FOREIGN KEY (assignment_id)
        REFERENCES assignment (assignment_id) ON DELETE CASCADE,
    CONSTRAINT ck_trainee_experience CHECK (year_of_experience >= 0)

);



CREATE TABLE Fire_Safety_Inspection (
    Inspection_ID        VARCHAR2(50) CONSTRAINT safety_pk PRIMARY KEY,
    Building_ID          VARCHAR2(50),
    Location             VARCHAR2(200) NOT NULL,
    Risk_Level           VARCHAR2(50) NOT NULL,
    Status               VARCHAR2(20) DEFAULT 'Pending',
    Next_Inspection_Date DATE,
    Inspection_Date      DATE NOT NULL,
    Inspection_Type      VARCHAR2(50) NOT NULL,
    Inspection_Result    VARCHAR2(500),

    CONSTRAINT chk_risk_level
        CHECK (Risk_Level IN ('Low', 'Medium', 'High')),

    CONSTRAINT chk_inspection_status
        CHECK (Status IN ('Pending', 'Completed', 'Cancelled'))
);




CREATE TABLE assigner_as_insp (
    citizen_id   VARCHAR2(50),
    assignment_id  VARCHAR2(50),

    inspection_id  VARCHAR2(50),

    CONSTRAINT pk_comp_as_insp PRIMARY KEY
        (citizen_id, assignment_id, inspection_id),
    CONSTRAINT fk_cai_comp FOREIGN KEY (citizen_id)
        REFERENCES citizen (citizen_id) ON DELETE CASCADE,
    CONSTRAINT fk_cai_as FOREIGN KEY (assignment_id)
        REFERENCES assignment (assignment_id) ON DELETE CASCADE,
    CONSTRAINT fk_cai_insp FOREIGN KEY (inspection_id)
        REFERENCES fire_safety_inspection (inspection_id) ON DELETE CASCADE
);




