import './App.css';
import { useRef } from 'react';
import { ScheduleComponent, TimelineViews, Inject, ResourceDirective, ResourcesDirective, ViewsDirective, ViewDirective, HeaderRowsDirective, HeaderRowDirective, Resize, DragAndDrop, getStartEndHours } from '@syncfusion/ej2-react-schedule';
import { extend, closest, remove, addClass } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';

const employeeRole = [
    { role: 'Doctors', id: 1, parentColor: '#cb6bb2' },
    { role: 'Nurses', id: 2, parentColor: '#56ca85' },
    { role: 'Support Staffs', id: 3, parentColor: '#df5286' }
];

const employeeData = [
    { name: 'Robert', id: 1, groupId: 1, color: '#df5286', Designation: 'General Practitioner' },
    { name: 'Nancy', id: 2, groupId: 1, color: '#7fa900', Designation: 'Cardiologist' },
    { name: 'Smith', id: 3, groupId: 1, color: '#7fa900', Designation: 'Neurologist' },
    { name: 'Williams', id: 4, groupId: 1, color: '#7fa900', Designation: 'General Practitioner' },
    { name: 'Laura', id: 5, groupId: 2, color: '#ea7a57', Designation: 'Staff Nurse' },
    { name: 'Margaret', id: 6, groupId: 2, color: '#5978ee', Designation: 'Head Nurse' },
    { name: 'Alice', id: 7, groupId: 3, color: '#df5286', Designation: 'Ward Assistant' },
    { name: 'Robson', id: 8, groupId: 3, color: '#00bdae', Designation: 'Hospital Attendant' }
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const getRandomDescription = () => Math.random() < 0.1 ? "On Leave" : "Available";

const generateShiftData = (startDate, numDays) => {
    const shiftData = [];
    const doctors = shuffleArray([...employeeData.filter(emp => emp.groupId === 1)]);
    const nurses = shuffleArray([...employeeData.filter(emp => emp.groupId === 2)]);
    const supportStaffs = shuffleArray([...employeeData.filter(emp => emp.groupId === 3)]);

    for (let i = 0; i < numDays; i++) {
        const day = new Date(startDate);
        day.setDate(day.getDate() + i);

        let assignedDoctors = shuffleArray([...doctors]);
        let assignedNurses = shuffleArray([...nurses]);
        let assignedSupportStaffs = shuffleArray([...supportStaffs]);

        let dayDoctor = assignedDoctors[0] || null;
        let dayOnCallDoctor = assignedDoctors[1] || null;
        let nightDoctor = assignedDoctors[2] || null;
        let nightOnCallDoctor = assignedDoctors[3] || null;
        let availableDoctor = assignedDoctors[4] || null; // Extra available doctor

        let dayNurse = assignedNurses[0] || null;
        let nightNurse = assignedNurses[1] || null;

        let dayStaff = assignedSupportStaffs[0] || null;
        let nightStaff = assignedSupportStaffs[1] || null;

        if (dayDoctor) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'Day Shift', Description: getRandomDescription(), StartTime: new Date(day.setHours(7, 0, 0)), EndTime: new Date(day.setHours(19, 0, 0)), RoleId: 1, EmployeeId: dayDoctor.id });
        }
        if (dayOnCallDoctor) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'On-Call Duty', Description: getRandomDescription(), StartTime: new Date(day.setHours(7, 0, 0)), EndTime: new Date(day.setHours(19, 0, 0)), RoleId: 1, EmployeeId: dayOnCallDoctor.id });
        }
        if (nightDoctor) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'Night Shift', Description: getRandomDescription(), StartTime: new Date(day.setHours(19, 0, 0)), EndTime: new Date(day.setHours(7, 0, 0) + 86400000), RoleId: 1, EmployeeId: nightDoctor.id });
        }
        if (nightOnCallDoctor) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'On-Call Duty', Description: getRandomDescription(), StartTime: new Date(day.setHours(19, 0, 0)), EndTime: new Date(day.setHours(7, 0, 0) + 86400000), RoleId: 1, EmployeeId: nightOnCallDoctor.id });
        }
        if (availableDoctor) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'Available', Description: getRandomDescription(), StartTime: new Date(day.setHours(0, 0, 0)), EndTime: new Date(day.setHours(23, 59, 59)), RoleId: 1, EmployeeId: availableDoctor.id });
        }

        if (dayNurse) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'Day Shift', Description: getRandomDescription(), StartTime: new Date(day.setHours(7, 0, 0)), EndTime: new Date(day.setHours(19, 0, 0)), RoleId: 2, EmployeeId: dayNurse.id });
        }
        if (nightNurse) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'Night Shift', Description: getRandomDescription(), StartTime: new Date(day.setHours(19, 0, 0)), EndTime: new Date(day.setHours(7, 0, 0) + 86400000), RoleId: 2, EmployeeId: nightNurse.id });
        }

        if (dayStaff) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'Day Shift', Description: getRandomDescription(), StartTime: new Date(day.setHours(7, 0, 0)), EndTime: new Date(day.setHours(19, 0, 0)), RoleId: 3, EmployeeId: dayStaff.id });
        }
        if (nightStaff) {
            shiftData.push({ Id: shiftData.length + 1, Subject: 'Night Shift', Description: getRandomDescription(), StartTime: new Date(day.setHours(19, 0, 0)), EndTime: new Date(day.setHours(7, 0, 0) + 86400000), RoleId: 3, EmployeeId: nightStaff.id });
        }
    }
    return shiftData;
};


const workShiftData = generateShiftData(new Date(2025, 1, 17), 14);






const group = {
    resources: ['Roles', 'Employees']
};

const timeScale = {
    enable: true,
    interval: 720,
    slotCount: 1,
    // majorSlotTemplate: (args) => {
    //     const hour = args.date.getHours();
    //     if (hour === 0) {
    //         return '12 AM- 12 PM';
    //     } else if (hour == 12) {
    //         return '12 PM – 12 AM';
    //     }
    // }
};

const workHours = { start: '00:00', end: '23:59' };

function App() {
    const scheduleObj = useRef(null);

    const onEventRendered = (args) => {
        if (args.data.Subject === 'Day Shift') {
            args.element.style.backgroundColor = '#ADD8E6'; // Light Blue
            args.element.style.color = '#000'; // Black text
        } else if (args.data.Subject === 'Night Shift') {
            args.element.style.backgroundColor = '#6A0DAD';
            args.element.style.color = '#fff'; // White text
        } else if (args.data.Subject === 'On-Call Duty') {
            args.element.style.backgroundColor = '#7fa900';
        }

        if (args.data.Description === 'On Leave') {
            args.element.classList.add('e-leave');
        }
    };

    const headerIndentTemplate = () => {
        return (<div className='e-resource-text'>
            <div className="text">Role/Employee</div></div>);
    }

    const resourceHeaderTemplate = (props) => {
        if (props.resource.name === 'Employees') {
            return (<div className="template-wrap">
                <div className="employee-category">
                    <div className={"employee-image " + getEmployeeImage(props)} />
                    <div className="employee-name"> {getEmployeeName(props)}</div>
                    <div className="employee-designation">{getEmployeeDesignation(props)}</div>
                </div>
            </div>);
        } else {
            return (<div className="e-resource-text">{props.resourceData.role}</div>);
        }
    };

    const getEmployeeName = (value) => {
        return value.resourceData[value.resource.textField];
    };
    const getEmployeeImage = (value) => {
        return getEmployeeName(value).toLowerCase();
    };
    const getEmployeeDesignation = (value) => {
        return value.resourceData.Designation;
    };


    const reserveStaffs = [
        {
            "Id": 1,
            "Name": "Day Shift",
            "StartTime": "2021-09-04T07:00:00.000Z",
            "EndTime": "2021-09-04T19:00:00.000Z",
            "Timing": '7:00 AM - 7:00 PM'
        },
        {
            "Id": 2,
            "Name": "Night Shift",
            "StartTime": "2021-09-04T19:00:00.000Z",
            "EndTime": "2021-09-05T07:00:00.000Z",
            "Timing": '7:00 PM - 7:00 AM'
        },
        {
            "Id": 3,
            "Name": "On-Call Duty",
            "StartTime": "2021-09-05T07:00:00.000Z",
            "EndTime": "2021-09-05T19:00:00.000Z",
            "Timing": '7:00 AM - 7:00 PM / 7:00 PM - 7:00 AM'
        },
        {
            "Id": 4,
            "Name": "Emergency Case",
            "StartTime": "2021-09-05T07:00:00.000Z",
            "EndTime": "2021-09-05T19:00:00.000Z",
            "Timing": '12:00 AM - 2:00 AM'
        }
    ];

    let treeObj = useRef(null);
    let isTreeItemDropped = false;
    let draggedItemId = '';
    const allowDragAndDrops = true;
    const fields = { dataSource: reserveStaffs, id: 'Id', text: 'Name' };
    const treeTemplate = (props) => {
        return (<div id="waiting">
            <div id="waitdetails">
                <div id="waitlist">{props.Name}</div>
                <div id="waitcategory">{props.Timing}</div>
            </div>
        </div>);
    };
    const onItemSelecting = (args) => {
        args.cancel = true;
    };
    const onTreeDrag = (event) => {
        if (scheduleObj.current.isAdaptive) {
            let classElement = scheduleObj.current.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                addClass([event.target], 'e-device-hover');
            }
        }
    };

    const onTreeDragStop = (event) => {
        let treeElement = closest(event.target, '.e-treeview');
        let classElement = scheduleObj.current.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            let scheduleElement = closest(event.target, '.e-content-wrap');
            if (scheduleElement) {
                let treeviewData = treeObj.current.fields.dataSource;
                if (event.target.classList.contains('e-work-cells')) {
                    const filteredData = treeviewData.filter((item) => item.Id === parseInt(event.draggedNodeData.id, 10));
                    let cellData = scheduleObj.current.getCellDetails(event.target);
                    let resourceDetails = scheduleObj.current.getResourcesByIndex(cellData.groupIndex);
                    let eventData = {
                        Subject: filteredData[0].Name,
                        StartTime: cellData.startTime,
                        EndTime: cellData.endTime,
                        IsAllDay: cellData.isAllDay,
                        RoleId: resourceDetails.resourceData.groupId,
                        EmployeeId: resourceDetails.resourceData.id
                    };
                    scheduleObj.current.openEditor(eventData, 'Add', true);
                    isTreeItemDropped = true;
                    draggedItemId = event.draggedNodeData.id;
                }
            }
        }
        document.body.classList.remove('e-disble-not-allowed');
    };
    const onTreeDragStart = () => {
        document.body.classList.add('e-disble-not-allowed');
    };

    const onRenderCell = (args) => {
        // if (args.elementType === 'workCells') {
        //     const date = args.date;
        //     const hour = date.getHours();
        //     if (hour >= 11 && hour <= 15) {  // Highlight 12 PM to 3 PM
        //         args.element.style.backgroundColor = '#ffeb3b'; // Yellow background
        //     }
        // }
    }

    const resizeStart = (args) => {
    //    args.interval = 10;
    }

    const resizeStop = (args) => {
       // debugger;
    }

    return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper drag-sample-wrapper'>
                <div className="schedule-container">
                    <div className="title-container">
                        <h1 className="title-text">Shift's Details</h1>
                    </div>
                    <ScheduleComponent
                        ref={scheduleObj}
                        currentView="TimelineWeek"
                        cssClass='schedule-drag-drop'
                        height="600px"
                        width='100%'
                        group={group}
                        eventSettings={{ dataSource: workShiftData, enableMaxHeight: true }}
                        timeScale={timeScale}
                        workHours={workHours}
                        showTimeIndicator={true}
                        eventRendered={onEventRendered}
                        headerIndentTemplate={headerIndentTemplate}
                        resourceHeaderTemplate={resourceHeaderTemplate}
                        renderCell={onRenderCell}
                        resizeStart={resizeStart}
                        resizeStop={resizeStop}
                    >

                        <ViewsDirective>
                            <ViewDirective option="TimelineWeek" />
                        </ViewsDirective>

                        <ResourcesDirective>
                            <ResourceDirective
                                field="RoleId"
                                title="Roles"
                                name="Roles"
                                dataSource={employeeRole}
                                textField="role"
                                idField="id"
                                colorField="parentColor"
                            />
                            <ResourceDirective
                                field="EmployeeId"
                                title="Employees"
                                name="Employees"
                                dataSource={employeeData}
                                textField="name"
                                idField="id"
                                groupIDField="groupId"
                                colorField="color"
                                allowMultiple={false}
                            />
                        </ResourcesDirective>

                        <Inject services={[TimelineViews, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
                <div className="treeview-container">
                    <div className="title-container">
                        <h1 className="title-text">Available Doctors</h1>
                    </div>
                    <TreeViewComponent ref={treeObj} cssClass='treeview-external-drag' dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                </div>
            </div>
        </div>
    </div>
    );
}

export default App;
