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
    background-color: white;
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
    height: 100vh
  }
  .fc .fc-daygrid-day {
    overflow: auto;
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
    display: normal;
    align-items: center;

  }

  .fc td {
    background: #f7f2fa;
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
  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled):active {
    background-color: #6a1b9a;
    color: white;
    padding: 4px 8px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0px 3px;
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

  .fc .fc-today-button {
    background-color: #6a1b9a;
    color: white;
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
      font-size: 8px;
   
    }
    .fc .fc-toolbar-title {
      font-size: 16px;
    }
  }

  @media (max-width: 280px) {
    .fc .fc-today-button {
      margin: 0;
      padding: 5px 5px;
      font-size: 8px;
    }
    .fc .fc-prev-button,
    .fc .fc-next-button,
    .fc .fc-timeGridDay-button,
    .fc-dayGridMonth-button {
      margin: 10px 10px;
      padding: 6px 6px;
      font-size: 4px;
    }
    .fc-daygrid-day-events {
      height: 0px;
      font-size: 0px;
    }
    .fc-dayGridMonth-view fc-view fc-daygrid {
      height: 653px;
    }

    .fc .fc-toolbar-title {
      font-size: 20px;
    }

 
    .fc .fc-daygrid-day {
      overflow: auto;
      height: auto;
    }
    .fc {
      height: 100vh;
      width 100vw;
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
      font-size: 18px;
    }
    .fc-day fc-day-wed fc-day-past fc-day-other fc-daygrid-day {
      height:40px;
    }
  }
`;
