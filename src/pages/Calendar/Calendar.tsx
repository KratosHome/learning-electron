import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import "./Calendar.scss"

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const {t, i18n} = useTranslation();
    console.log(i18n.language)

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

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const currentMonth = currentDate.toLocaleString(`${i18n.language === "en" ? "default" : "uk-UA"}`, {month: 'long'});
    const currentYear = currentDate.getFullYear();

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };

    const [todos, setTodos] = useState([
        { id: 1, date: new Date(2023, 2, 15), text: 'Example todo 1' },
        { id: 2, date: new Date(2023, 2, 17), text: 'Example todo 2' },
    ]);

    const onAddTodo = (date:any, text:any) => {
        const newTodo = { id: Date.now(), date, text };
        setTodos([...todos, newTodo]);
    };

    console.log(todos)

    return (
        <div className="container-calendar">

            <div className="info-calendar">
                <div>{t('today')}</div>
                <button onClick={prevMonth}> {'<'}</button>
                <button onClick={nextMonth}>{'>'}</button>
                <div>{currentMonth}</div>
                <div>{currentYear}</div>
                <div>Search</div>
                <div>Вид</div>
            </div>
            <div className="calendar-calendar">
                {days.map((day, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: isToday(day) ? 'yellow' : 'transparent', // Змініть кольори на своє бажання
                        }}
                    >
                        {day.getDate()}
                        <button onClick={() => onAddTodo(day, 'New todo')}>Add todo</button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Calendar;
