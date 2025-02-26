import './App.css';
import { useRef, useState, useCallback } from 'react';
import { ScheduleComponent, TimelineViews, TimelineMonth, Inject, ResourceDirective, ResourcesDirective, ViewsDirective, ViewDirective, HeaderRowsDirective, HeaderRowDirective, Resize, DragAndDrop, getStartEndHours } from '@syncfusion/ej2-react-schedule';
import { extend, closest, remove, addClass } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ToolbarComponent, ItemsDirective, ItemDirective, ContextMenuComponent, AppBarComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

const currentDate = new Date();

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

        const getRandomDescription = () => {
            const rand = Math.random();
            if (rand < 0.1) return "On Leave";         // 10% chance of full leave
            if (rand < 0.2) return "First Half Leave"; // 10% chance of first half leave
            if (rand < 0.3) return "Second Half Leave"; // 10% chance of second half leave
            return "Available"; // 70% chance of being available
        };

        const createShiftWithBreak = (employee, roleId, shiftName, startDay, startHour, endDay, endHour, breakHour) => {
            const description = getRandomDescription();

            const part1Start = new Date(startDay);
            part1Start.setHours(startHour, 0, 0);

            const part2End = new Date(endDay);
            part2End.setHours(endHour, 0, 0);

            const breakStart = new Date(endDay);
            breakStart.setHours(breakHour, 0, 0);

            const breakEnd = new Date(endDay);
            breakEnd.setHours(breakHour + 1, 0, 0); // 1-hour break

            if (description === "On Leave") {
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `${shiftName} (On Leave)`,
                    StartTime: part1Start,
                    EndTime: part2End,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "On Leave",
                    Color: "#FFCDD2", // Light red for full leave,
                    IsReadonly: part2End < currentDate ? true : false
                });
            } else if (description === "First Half Leave") {
                // First half leave event (HLD)
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `Half-Day Leave (${shiftName} - First Half)`,
                    StartTime: part1Start,
                    EndTime: breakStart,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Half-Day Leave",
                    Color: "#FFECB3",
                    IsReadonly: breakStart < currentDate ? true : false
                });

                // Break Event (BRL)
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `Break (${shiftName})`,
                    StartTime: breakStart,
                    EndTime: breakEnd,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Break",
                    Color: "#B0BEC5",
                    IsReadonly: breakEnd < currentDate ? true : false
                });

                // Second half available
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `${shiftName}`,
                    StartTime: breakEnd,
                    EndTime: part2End,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Available",
                    IsReadonly: part2End < currentDate ? true : false
                });
            } else if (description === "Second Half Leave") {
                // First half available
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `${shiftName}`,
                    StartTime: part1Start,
                    EndTime: breakStart,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Available",
                    IsReadonly: breakStart < currentDate ? true : false
                });

                // Break Event (BRL)
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `Break (${shiftName})`,
                    StartTime: breakStart,
                    EndTime: breakEnd,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Break",
                    Color: "#B0BEC5",
                    IsReadonly: breakEnd < currentDate ? true : false
                });

                // Second half leave event (HLD)
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `Half-Day Leave (${shiftName} - Second Half)`,
                    StartTime: breakEnd,
                    EndTime: part2End,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Half-Day Leave",
                    Color: "#FFECB3",
                    IsReadonly: part2End < currentDate ? true : false
                });
            } else {
                // Regular Shift - Before Break
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `${shiftName}`,
                    StartTime: part1Start,
                    EndTime: breakStart,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Available",
                    IsReadonly: breakStart < currentDate ? true : false
                });

                // Break Event (BRL)
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `Break (${shiftName})`,
                    StartTime: breakStart,
                    EndTime: breakEnd,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Break",
                    Color: "#B0BEC5",
                    IsReadonly: breakEnd < currentDate ? true : false
                });

                // Regular Shift - After Break
                shiftData.push({
                    Id: shiftData.length + 1,
                    Subject: `${shiftName}`,
                    StartTime: breakEnd,
                    EndTime: part2End,
                    RoleId: roleId,
                    EmployeeId: employee.id,
                    Description: "Available",
                    IsReadonly: part2End < currentDate ? true : false
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
    slotCount: 2,
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
    const [isTimelineView, setIsTimelineView] = useState(true);

    const onEventRendered = (args) => {
        // const currentDate = new Date().setHours(0, 0, 0, 0);
        // if (args.data.EndTime < currentDate) {
        //     args.data.isrea
        // }
        // if (args.data.EndTime < scheduleObj.current.selectedDate && args.data.EndTime.getDate() < new Date().getDate()) {
        //     args.element.classList.add('e-past-app');
        // }
        // else
        if (args.data.Subject.includes('Overtime shift')) {
            // args.element.classList.add('e-overtime');
        } else if (args.data.Description.includes('covers for')) {
            args.element.querySelector('.e-subject').innerText = args.data.Description;
            args.element.classList.add('e-covers');

            let iconElement = document.createElement('span');
            iconElement.classList.add('e-icons');

            args.element.querySelector('.e-inner-wrap')?.appendChild(iconElement);
        } else if (args.data.Description === 'On Leave') {
            // args.data.Subject = 'Not Available(' + args.data.Subject + ')';
            args.element.querySelector('.e-subject').innerText = args.data.Description;
            args.element.classList.add('e-leave');

            let iconElement = document.createElement('span');
            iconElement.classList.add('e-icons');

            args.element.querySelector('.e-inner-wrap')?.appendChild(iconElement);
        } else if (args.data.Description === "Half-Day Leave") {
            //args.data.Subject = 'Not Available(' + args.data.Subject + ')';
            args.element.querySelector('.e-subject').innerText = 'Half-Day Leave';
            args.element.classList.add('e-half-leave');

            let iconElement = document.createElement('span');
            iconElement.classList.add('e-icons');

            args.element.querySelector('.e-inner-wrap')?.appendChild(iconElement);
        } else if (args.data.Subject === 'Day Shift') {
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
    };


    const onRenderCell = (args) => {
        if (args.elementType === 'workCells') {
            const date = args.date.getDate();
            //  const hour = date.getHours();
            if (date < 17) {  // Highlight 12 PM to 3 PM
                args.element.style.backgroundColor = '#f3f3f3';
            }

            const day = args.date.getDay();
            if (day === 0 || day === 5 || day === 6) {
          //      args.element.style.backgroundColor = '#ffa0a4';
            }

            const currentDate = new Date().setHours(0, 0, 0, 0);
            if (args.date < currentDate) {
                args.element.classList.add('e-past');
            }
        }
    }

    const onActionBegin = (event) => {
        if (event.requestType === 'eventChange' && isTreeItemDropped) {
            let treeViewData = treeObj.current.fields.dataSource;
            const filteredPeople = treeViewData.filter((item) => item.Id !== parseInt(draggedItemId, 10));
            treeObj.current.fields.dataSource = filteredPeople;
            let elements = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (let i = 0; i < elements.length; i++) {
                remove(elements[i]);
            }
        }
    };

    const resizeStart = (args) => {
        args.interval = 30;
    }
    const resizing = (args) => {
        console.log(args);
    }

    const resizeStop = (args) => {
        const eventDetails = scheduleObj.current.getEventDetails(args.element);
        const updatedEventDetails = args.data;
        if (eventDetails.EndTime < updatedEventDetails.EndTime) {
            args.cancel = true;
            if (eventDetails.Description.toLowerCase().includes('leave')) {
                return;
            }
            let eventData = {
                Subject: 'Overtime shift (' + eventDetails.Subject + ')',
                StartTime: eventDetails.EndTime,
                EndTime: updatedEventDetails.EndTime,
                IsAllDay: false,
                Description: "Extra working hours",
                EmployeeId: eventDetails.EmployeeId,
                RoleId: eventDetails.RoleId
              };
              scheduleObj.current.openEditor(eventData, 'Add', true);
        }
    }

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
        { Id: 1, Name: "Doctors", HasChild: true, Expanded: true },
        { Id: 2, PId: 1, Name: "John", Description: 'General Practitioner' },
        { Id: 3, PId: 1, Name: "Nashil", Description: 'Cardiologist' },
        { Id: 4, PId: 1, Name: "Salman", Description: 'Neurologist' },

        { Id: 5, Name: "Nurses", HasChild: true, Expanded: true },
        { Id: 6, PId: 5, Name: "Roy", Description: 'Staff Nurse' },
        { Id: 7, PId: 5, Name: "Troot", Description: 'Staff Nurse' },

        { Id: 8, Name: "Support Staffs", HasChild: true, Expanded: true },
        { Id: 9, PId: 8, Name: "Ricky", Description: 'Ward Assistant' },
        { Id: 10, PId: 8, Name: "Nasheem", Description: 'Ward Assistant' },
    ];

    let treeObj = useRef(null);
    let isTreeItemDropped = false;
    let draggedItemId = '';
    const allowDragAndDrops = true;
    const fields = { dataSource: reserveStaffs, id: 'Id', parentID: 'PId', text: 'Name', hasChildren: 'HasChild', expanded: 'Expanded' };
    const treeTemplate = (props) => {
        if (props.HasChild) {
            return (
                <div className="header-role">{props.Name}</div>
            );
        } else {
            return (<div id="waiting">
                <div id="waitdetails">
                    <div className={"employee-image "} />
                    <div id="waitlist">{props.Name}</div>
                    <div id="waitcategory">{props.Description}</div>
                </div>
            </div>);
        }
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
                let target = closest(event.target, '.e-appointment.e-leave') || closest(event.target, '.e-appointment.e-half-leave');
                if (target) {
                    const filteredData = treeviewData.filter((item) => item.Id === parseInt(event.draggedNodeData.id, 10));
                    let eventDetails = scheduleObj.current.getEventDetails(target);

                    const category = treeviewData.filter((item) => item.Id === parseInt(filteredData[0].PId, 10));
                    const role = employeeRole.filter((item) => item.id === parseInt(eventDetails.RoleId, 10));
                    if (role[0].role === category[0].Name) {
                        let resourceDetails = scheduleObj.current.getResourcesByIndex(eventDetails.EmployeeId);
                        eventDetails.Description = 'Dr.' + filteredData[0].Name + ' covers for Dr.' + resourceDetails.resourceData.name;
                        eventDetails.Subject = eventDetails.Subject.split('(')[0].trim() + ' (Dr.' + filteredData[0].Name + ')';
                        scheduleObj.current.openEditor(eventDetails, 'EditOccurrence');
                        isTreeItemDropped = true;
                        draggedItemId = event.draggedNodeData.id;
                    }
                }
            }
        }
        document.body.classList.remove('e-disble-not-allowed');
    };

    const onTreeDragStart = () => {
        document.body.classList.add('e-disble-not-allowed');
    };

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
        );
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
                        resizing={resizing}
                        resizeStop={resizeStop}
                        actionBegin={onActionBegin}
                    >

                        <ViewsDirective>
                            <ViewDirective option='TimelineDay' />
                            <ViewDirective option="TimelineWeek" />
                            <ViewDirective option='TimelineMonth' />
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

                        <Inject services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
                    </ScheduleComponent>
                </div>
                <div className="treeview-container">
                    <div className="title-container">
                        <h1 className="title-text">Available Staffs</h1>
                    </div>
                    <TreeViewComponent ref={treeObj} cssClass='treeview-external-drag' dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                </div>
            </div>
        </div>
    </div>
    );
}

export default App;
