import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;

  .fc ::-webkit-scrollbar {
    width: 12px;
    border-radius: 4px;
  }
  .fc-list-event-graphic {
    display: none;
  }
  .fc ::-webkit-scrollbar-track {
    background-color: #f7f2fa;
    width: 12px;
  }

  .fc ::-webkit-scrollbar-thumb {
    background-color: #7d4b99;
    border-radius: 6px;
    width: 1px;
  }

  .fc ::-webkit-scrollbar-thumb:hover {
    background-color: #cc96eb;
  }

  .fc {
    scrollbar-width: thin;
    scrollbar-color: #black;
    height: 100vh;
  
  }

  .fc .fc-daygrid-day {
    overflow-y: auto;
    height: 10%;
  }

  .fc .fc-daygrid-day-frame {
    overflow: auto;
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding: 4px;
  }

  .fc-event {
    overflow: hidden;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .fc-list-event-time {
    position: relative;
    left: 25px;
    color: purple;
  }
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: 0px;
  }
  .fc-list-day-text {
    position: relative;
    z-index: 2;
  }

  .fc-list-event {
    position: relative;
    z-index: 1;
  }

  .fc tr {
    background: #f7f2fa;
  }

  .fc-daygrid-day-events {
    height: 0%;
  }

  .fc-daygrid-day-top {
    height: 0%;
  }
  .fc-list-event-graphic {
    width: 100%;
  }

  .fc .fc-daygrid-day-number {
  padding:2px;

  }

  .fc td{
    color: none;
    background: #f7f2fa;
  }
  .fc-h-event{
    margin-left:22px;
    background:none;
    border:none;
  }
  .fc-day-selected,
  .fc .fc-day-today {

    background-color: #f2f0fa;
    color: black;
  }

  .fc .fc-prev-button,
  .fc .fc-next-button,
  .fc .fc-timeGridDay-button,
  .fc-dayGridMonth-button,
  .fc .fc-listMonth-button:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled):active,
  .fc-listMonth-button.fc-button.fc-button-primary:not(.fc-button-active),
  .fc .fc-today-button   {
    background-color: #6a1b9a;
    color: white;
    padding: 6px 10px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin: 3px 6px;
    &:hover {
      background-color: #7e57c2;
      border-color: #673ab7;
    }
    &:focus {
      box-shadow: 0 0 0 2px rgba(103, 58, 183, 0.5);
      outline: none;
    }
  }

  .fc .fc-toolbar-title {
    color: #6a1b9a;
  }

  .fc .fc-list-event-dot {
    display: none;
  }

  @media (max-width: 768px) {
    width: auto;
    height: 100%;

    fc-daygrid-day-frame fc-scrollgrid-sync-inner {
      height: 0px;
    }
    .fc ::-webkit-scrollbar {
      width: 8px;
      border-radius: 4px;
    }
    .fc-daygrid-day-events {
      margin-bottom: 10px;
    }
    .fc ::-webkit-scrollbar-track {
      background-color: white;
      width: 8px;
    }
    .fc {
      height: auto;
    }
    .fc-daygrid-day-events {
      height: 0px;
      font-size: 0px;
    }
    .fc-daygrid-day {
      height: auto;
    }
    .fc-daygrid-day-frame {
      height: auto;
      font-size: 2px;
    }
    .fc .fc-daygrid-day-number {
      font-size: 12px;
      margin-left:4px;
    }
    .fc .fc-toolbar-title {
      font-size: 16px;
    }
  }

  @media (max-width: 280px) {
    .fc {
      height: 100vh;
      width: 100%;
    }
    .fc .fc-scrollgrid  fc-scrollgrid-liquid {
      font-size:10px;
    }
    
    .fc .fc-button,
    .fc .fc-today-button,
    .fc .fc-prev-button,
    .fc .fc-next-button,
    .fc .fc-timeGridDay-button,
    .fc-dayGridMonth-button,
    .fc .fc-listMonth-button:not(:disabled).fc-button-active,
    .fc .fc-button-primary:not(:disabled).fc-button-active,
    .fc .fc-button-primary:not(:disabled):active {
      margin: 4px;
      padding: 4px;
      font-size: 9px; 
    }

  
    .fc .fc-toolbar-title {
      font-size: 20px;
    }

 
    .fc .fc-daygrid-day {
      overflow: auto;
      height: auto;
    }


    .fc-daygrid-day {
      height: 40px;
      width 100vw;
    }
    .fc .fc-daygrid-day-frame {
      height: 40px;
      width: 100%;
    }
   
    .fc .fc-toolbar-title {
      font-size: 14px;
      margin: 6px
    }
  }

`;
