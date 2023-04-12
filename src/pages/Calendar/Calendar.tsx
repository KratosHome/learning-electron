import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import "./Calendar.scss"
import {GoToToday} from "../../components/calendar/GoToToday";
import {ChangeMonth, DayItem, TodoItem} from "../../components/calendar";

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const {i18n} = useTranslation();

    const daysInMonth = (date: Date) => {
        const month = date.getMonth();
        const year = date.getFullYear();
        return new Date(year, month + 1, 0).getDate();
    };

    const daysArray = (date: Date) => {
        const daysCount = daysInMonth(date);
        const days = [];
        for (let i = 1; i <= daysCount; i++) {
            days.push(new Date(date.getFullYear(), date.getMonth(), i));
        }
        return days;
    };

    const days = daysArray(currentDate);


    const currentMonth = currentDate.toLocaleString(`${i18n.language === "en" ? "default" : "uk-UA"}`, {month: 'long'});
    const currentYear = currentDate.getFullYear();

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };

    const [todos, setTodos] = useState([
        {id: 1, date: new Date(2023, 2, 15), text: 'Example todo 1'},
        {id: 2, date: new Date(2023, 2, 17), text: 'Example todo 2'},
    ]);

    const onAddTodo = (date: any, text: any) => {
        const newTodo = {id: Date.now(), date, text};
        setTodos([...todos, newTodo]);
    };


    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, todoId: number) => {
        e.dataTransfer.setData('todoId', todoId.toString());
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, date: Date) => {
        e.preventDefault();
        const todoId = parseInt(e.dataTransfer.getData('todoId'));
        const newTodos = todos.map((todo) => {
            if (todo.id === todoId) {
                return {...todo, date: new Date(date)};
            }
            return todo;
        });
        setTodos(newTodos);
    };


    return (
        <div className="container-calendar">
            <div className="info-calendar">
                <GoToToday setCurrentDate={setCurrentDate}/>
                <ChangeMonth setCurrentDate={setCurrentDate} currentDate={currentDate}/>
                <div>{currentMonth}</div>
                <div>{currentYear}</div>
                <div>Search</div>
                <div>Вид</div>
            </div>
            <div className="calendar-calendar">
                {days.map((day, index) => (
                    <DayItem
                        key={index}
                        day={day}
                        isToday={isToday(day)}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                    >
                        {todos
                            .filter((todo) => {
                                const todoDate = new Date(todo.date);
                                return (
                                    todoDate.getDate() === day.getDate() &&
                                    todoDate.getMonth() === day.getMonth() &&
                                    todoDate.getFullYear() === day.getFullYear()
                                );
                            })
                            .map((todo) => (
                                <TodoItem key={todo.id} todo={todo} handleDragStart={handleDragStart}/>
                            ))}
                        <button onClick={() => onAddTodo(day, 'New todo')}>Add todo</button>
                    </DayItem>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
