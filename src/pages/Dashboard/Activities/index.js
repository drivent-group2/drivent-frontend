import { useEffect, useState } from 'react';
import useActivity from '../../../hooks/api/useActivity';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import { getActivities } from '../../../services/activityApi';
import { ErrorMessage } from '../Hotel';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { IoEnterOutline } from 'react-icons/io5';

export default function Activities() {
  const { ticket, getTicket, ticketLoading } = useTicket();
  const token = useToken();
  const [activities, setActivities] = useState();
  const [dates, setDates] = useState([]);
  const [dayActivities, setDayActivities] = useState([]);
  const [activitiesPlaces, setActivitiesPlaces] = useState([]);

  useEffect(async() => {
    if (ticket) {
      const ticketTypeId = ticket.TicketType.id;
      const acts = await getActivities(token, ticketTypeId);
      setActivities(acts);
      const days = [];
      for (const act of acts) {
        const actDay = act.day.slice(5, 10);
        const hasDay = days.find((day) => day === actDay);
        if (!hasDay) days.push(actDay);
      }
      setDates([...days]);
    }
  }, [ticket]);

  function activityData(date) {
    const dayActs = activities.filter((activity) => activity.day.slice(5, 10) === date);
    const places = [];
    for (const act of dayActs) {
      const hasPlace = places.find((place) => place === act.place);
      act.endTime = Number(act.time.slice(11, 13)) + Number(act.duration.slice(11, 13));
      if (!hasPlace) places.push(act.place);
    }
    console.log(dayActs);
    console.log(places);
    setDayActivities([...dayActs]);
    setActivitiesPlaces([...places]);
  }

  function entryActivity(activityId) {
    
  }

  if (ticketLoading) {
    return <ErrorMessage>Carregando....</ErrorMessage>;
  }
  if (!ticket) {
    return <ErrorMessage>Selecione um ticket para poder visualizar suas atividades </ErrorMessage>;
  }
  if (ticket.status === 'RESERVED') {
    return <ErrorMessage>Realize o pagamento do ticket para visualizar as atividades...</ErrorMessage>;
  }
  if (ticket.TicketType.isRemote === true) {
    return (
      <ErrorMessage>Seu ingresso é de um evento online, não há nescesidade de escolher atividades...</ErrorMessage>
    );
  }

  return (
    <>
      <Title>Selecione Atividades</Title>
      <Dates>
        {dates.map((date) => (
          <DataButton
            onClick={() => {
              activityData(date);
            }}
          >
            {date}
          </DataButton>
        ))}
      </Dates>
      <ActivitiesBox>
        {activitiesPlaces.map((activityPlace) => (
          <>
            <ActivitiesByNameBox>
              <ActivityBoxTitle>{activityPlace}</ActivityBoxTitle>
              {dayActivities.map((activity) =>
                activity.place === activityPlace ? (
                  <ActivityBox duration={Number(activity.duration.slice(11, 13))}>
                    <div>{activity.name}</div>
                    <div>
                      {activity.time.slice(11, 16)} - {activity.endTime + ':00 '}h
                    </div>
                    <ButtonSet>
                      <ButtonAct onClick={() => {entryActivity(activity.id);}}>
                        <IoEnterOutline color="green" size={'25px'} />
                      </ButtonAct>
                      {activity.vacancies}/{activity.capacity + ' Vagas'}
                    </ButtonSet>
                  </ActivityBox>
                ) : (
                  ''
                )
              )}
            </ActivitiesByNameBox>
          </>
        ))}
      </ActivitiesBox>
    </>
  );
}

const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  margin-bottom: 30px;
`;

const Dates = styled.div`
  display: flex;
  overflow-x: auto;
`;

const DataButton = styled.div`
  width: 100px;
  height: 40px;
  background-color: #e4e4e4;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  margin-bottom: 8px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
`;

const ActivitiesBox = styled.div`
  margin: 8px;
  width: 98%;
  height: 78%;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  justify-content: start;
  overflow: auto;
`;

const ActivityBox = styled.div`
  width: 90%;
  min-height: calc(80px * ${(props) => props.duration});
  max-height: calc(80px * ${(props) => props.duration});
  background-color: #ffffffff;
  margin: 5px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;

  div {
    padding: 2px;
    margin-left: 10px;
    font-size: 16px;
    display: flex;
  }
`;

const ActivityBoxTitle = styled.div`
  font-weight: 700;
  font-size: 18px !important;
  width: 250px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ActivitiesByNameBox = styled.div`
  min-width: 250px;
  min-height: 80%;
  overflow-y: auto;
  background-color: #f1f1f1f1;
  margin: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
`;

const ButtonAct = styled.button`
  background-color: unset;
  border: unset;
`;

const ButtonSet = styled.div`
  display: flex;
  align-items: center;
`;
