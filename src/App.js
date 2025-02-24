import './App.css';
import { useRef, useState, useCallback } from 'react';
import { ScheduleComponent, TimelineViews, Inject, ResourceDirective, ResourcesDirective, ViewsDirective, ViewDirective, HeaderRowsDirective, HeaderRowDirective, Resize, DragAndDrop, getStartEndHours } from '@syncfusion/ej2-react-schedule';
import { extend, closest, remove, addClass } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ToolbarComponent, ItemsDirective, ItemDirective, ContextMenuComponent, AppBarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

const employeeRole = [
    { role: 'Doctors', id: 1, parentColor: '#cb6bb2' },
    { role: 'Nurses', id: 2, parentColor: '#56ca85' },
    { role: 'Support Staffs', id: 3, parentColor: '#ADD8E6' }
];

const employeeData = [
    { name: 'Robert', id: 1, groupId: 1, color: '#ADD8E6', Designation: 'General Practitioner' },
    { name: 'Nancy', id: 2, groupId: 1, color: '#6A0DAD', Designation: 'Cardiologist' },
    { name: 'Smith', id: 3, groupId: 1, color: '#7fa900', Designation: 'Neurologist' },
    { name: 'Williams', id: 4, groupId: 1, color: '#7fa900', Designation: 'General Practitioner' },
    { name: 'Laura', id: 5, groupId: 2, color: '#ea7a57', Designation: 'Staff Nurse' },
    { name: 'Margaret', id: 6, groupId: 2, color: '#5978ee', Designation: 'Head Nurse' },
    { name: 'Alice', id: 7, groupId: 3, color: '#df5286', Designation: 'Ward Assistant' },
    { name: 'Robson', id: 8, groupId: 3, color: '#00bdae', Designation: 'Hospital Attendant' }
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// const getRandomDescription = () => Math.random() < 0.1 ? "On Leave" : "Available";

const generateShiftData = (startDate, numDays) => {
    const shiftData = [];
    const doctors = employeeData.filter(emp => emp.groupId === 1);
    const nurses = employeeData.filter(emp => emp.groupId === 2);
    const supportStaffs = employeeData.filter(emp => emp.groupId === 3);

    // Fixed Shift Employees
    const dayShiftDoctors = doctors.filter(doc => doc.name === "Robert");
    const nightShiftDoctors = doctors.filter(doc => doc.name === "Nancy");
    const remainingDoctors = doctors.filter(doc => !dayShiftDoctors.includes(doc) && !nightShiftDoctors.includes(doc));

    const dayShiftNurses = nurses.filter(nurse => nurse.name === "Laura");
    const nightShiftNurses = nurses.filter(nurse => nurse.name === "Margaret");

    const dayShiftStaff = supportStaffs.filter(staff => staff.name === "Alice");
    const nightShiftStaff = supportStaffs.filter(staff => staff.name === "Robson");

    for (let i = 0; i < numDays; i++) {
        const day = new Date(startDate);
        day.setDate(day.getDate() + i);

        let prevDay = new Date(day);
        prevDay.setDate(prevDay.getDate() - 1); // Previous day for night shift

        let assignedDoctors = shuffleArray([...remainingDoctors]);
        let dayOnCallDoctor = assignedDoctors[0] || null;
        let nightOnCallDoctor = assignedDoctors[1] || dayOnCallDoctor; // Ensure at least one On-Call doctor per shift

        const getRandomDescription = () => Math.random() < 0.1 ? "On Leave" : "Available";

const createShiftWithBreak = (employee, roleId, shiftName, startDay, startHour, endDay, endHour, breakHour) => {
    const description = getRandomDescription(); // Get "Available" or "On Leave"

    const part1Start = new Date(startDay);
    part1Start.setHours(startHour, 0, 0);

    const part2End = new Date(endDay);
    part2End.setHours(endHour, 0, 0);

    if (description === "On Leave") {
        // If the employee is on leave, do not split the shift
        shiftData.push({
            Id: shiftData.length + 1,
            Subject: `${shiftName} (On Leave)`,
            StartTime: part1Start,
            EndTime: part2End,
            RoleId: roleId,
            EmployeeId: employee.id,
            Description: "On Leave"
        });
    } else {
        // If the employee is available, split shift into three parts (Before Break, Break, After Break)
        const breakStart = new Date(endDay);
        breakStart.setHours(breakHour, 0, 0);

        const breakEnd = new Date(endDay);
        breakEnd.setHours(breakHour + 1, 0, 0); // 1-hour break

        shiftData.push({
            Id: shiftData.length + 1,
            Subject: `${shiftName}`,
            StartTime: part1Start,
            EndTime: breakStart,
            RoleId: roleId,
            EmployeeId: employee.id,
            Description: "Available"
        });

        shiftData.push({
            Id: shiftData.length + 1,
            Subject: `Break (${shiftName})`,
            StartTime: breakStart,
            EndTime: breakEnd,
            RoleId: roleId,
            EmployeeId: employee.id,
            Description: "Available",
            Color: "#B0BEC5" // Soft Gray for professional break color
        });

        shiftData.push({
            Id: shiftData.length + 1,
            Subject: `${shiftName}`,
            StartTime: breakEnd,
            EndTime: part2End,
            RoleId: roleId,
            EmployeeId: employee.id,
            Description: "Available"
        });
    }
};

        // **Day Shift (7 AM - 7 PM) → Break at 1 PM - 2 PM**
        dayShiftDoctors.forEach(doctor => createShiftWithBreak(doctor, 1, "Day Shift", day, 7, day, 19, 12));
        if (dayOnCallDoctor) createShiftWithBreak(dayOnCallDoctor, 1, "On-Call Duty", day, 7, day, 19, 12);

        // **Night Shift (Previous Day 7 PM - Next Day 7 AM) → Break at 1 AM - 2 AM**
        nightShiftDoctors.forEach(doctor => createShiftWithBreak(doctor, 1, "Night Shift", prevDay, 19, day, 7, 0));
        if (nightOnCallDoctor) createShiftWithBreak(nightOnCallDoctor, 1, "On-Call Duty", prevDay, 19, day, 7, 0);

        // **Nurses**
        dayShiftNurses.forEach(nurse => createShiftWithBreak(nurse, 2, "Day Shift", day, 7, day, 19, 12));
        nightShiftNurses.forEach(nurse => createShiftWithBreak(nurse, 2, "Night Shift", prevDay, 19, day, 7, 0));

        // **Support Staff**
        dayShiftStaff.forEach(staff => createShiftWithBreak(staff, 3, "Day Shift", day, 7, day, 19, 12));
        nightShiftStaff.forEach(staff => createShiftWithBreak(staff, 3, "Night Shift", prevDay, 19, day, 7, 0));
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
    const [isTimelineView, setIsTimelineView] = useState(false);

    const onEventRendered = (args) => {
        // if (args.data.EndTime < scheduleObj.current.selectedDate && args.data.EndTime.getDate() < new Date().getDate()) {
        //     args.element.classList.add('e-past-app');
        // }
        // else 
        if (args.data.Subject === 'Day Shift') {
            args.element.style.backgroundColor = '#ADD8E6'; // Light Blue
            args.element.style.color = '#000'; // Black text
        } else if (args.data.Subject === 'Night Shift') {
            args.element.style.backgroundColor = '#6A0DAD';
            args.element.style.color = '#fff'; // White text
        } else if (args.data.Subject === 'On-Call Duty') {
            args.element.style.backgroundColor = '#7fa900';
        } else if (args.data.Subject === 'Break (Day Shift)') {
            args.element.style.backgroundColor = '#90caf9';
        } else if (args.data.Subject === 'Break (Night Shift)') {
            args.element.style.backgroundColor = '#9711f7';
        } else if (args.data.Subject === 'Break (On-Call Duty)') {
            args.element.style.backgroundColor = '#abe302';
        }

        

        if (args.data.Description === 'On Leave') {
            args.data.Subject = 'Not Available(' + args.data.Subject + ')';
            args.element.querySelector('.e-subject').innerText = 'Leave';
            args.element.classList.add('e-leave');

            let iconElement = document.createElement('span');
            iconElement.classList.add('e-icons');

            args.element.querySelector('.e-inner-wrap')?.appendChild(iconElement);
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
        if (args.elementType === 'workCells') {
            const date = args.date.getDate();
            //  const hour = date.getHours();
            if (date < 17) {  // Highlight 12 PM to 3 PM
                args.element.style.backgroundColor = '#f3f3f3';
            }
        }
    }

    const resizeStart = (args) => {
        args.interval = 10;
    }

    const resizeStop = (args) => {
        debugger;
    }

    const onChange = (args) => {
        setIsTimelineView(args.checked);
    };

    const groupTemplate = useCallback(() => {
        return (
            <div className='template'>
                <label className='checkbox-container'>
                    <CheckBoxComponent
                        id='admin'
                        checked={isTimelineView}
                        change={onChange}
                    />
                    <span className='text-child'> Is Admin</span>
                </label>
            </div>
        );;
    }, []);

    return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper drag-sample-wrapper'>
                <div className="schedule-container">
                    <div className="title-container">
                        <h1 className="title-text">Shift's Details</h1>
                    </div>
                    <ToolbarComponent>
                        <ItemsDirective>
                            <ItemDirective tooltipText='Grouping' text='Grouping' template={groupTemplate} />
                        </ItemsDirective>
                    </ToolbarComponent>

                    <ScheduleComponent
                        ref={scheduleObj}
                        currentView="TimelineWeek"
                        cssClass='schedule-drag-drop'
                        height="600px"
                        width='100%'
                        readonly={!isTimelineView}
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
