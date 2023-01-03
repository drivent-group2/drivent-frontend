import { useEffect, useState } from 'react';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import { getActivities, postTicketActivity } from '../../../services/activityApi';
import { ErrorMessage } from '../Hotel';
import styled from 'styled-components';
import { IoEnterOutline } from 'react-icons/io5';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export default function Activities() {
  const { ticket, ticketLoading } = useTicket();
  const token = useToken();
  const [activities, setActivities] = useState([]);
  const [dates, setDates] = useState([]);
  const [dayActivities, setDayActivities] = useState([]);
  const [activitiesPlaces, setActivitiesPlaces] = useState([]);
  const [disableIonIcon, setDisableIonIcon] = useState(false);

  useEffect(async() => {
    if (ticket) {
      const ticketTypeId = ticket.TicketType.id;
      const acts = await getActivities(token, ticketTypeId);
      console.log(acts);
      setActivities([...acts]);
      const days = [];
      for (const act of acts) {
        const actDay = act.startDate.slice(5, 10);
        const hasDay = days.find((day) => day === actDay);
        if (!hasDay) days.push(actDay);
      }
      setDates([...days]);
    }
  }, [ticket]);

  async function activityData(date) {
    if (!date) date = dayActivities[0]?.startDate.slice(5, 10);
    const acts = await getActivities(token, ticket.TicketType.id);
    const dayActs = acts.filter((activity) => activity.startDate.slice(5, 10) === date);
    const places = [];
    for (const act of dayActs) {
      const hasPlace = places.find((place) => place === act.place);
      act.endTime = Number(act.startDate.slice(11, 13)) + Number(act.endDate.slice(11, 13));
      if (!hasPlace) places.push(act.place);
    }
    setDayActivities([...dayActs]);
    setActivitiesPlaces([...places]);
    setDisableIonIcon(false);
  }

  function entryActivity(activity, color) {
    setDisableIonIcon(true);
    if (color === 'gray') {
      toast('Você já esta inscrito na atividade!');
      setDisableIonIcon(false);
      return;
    }
    const promise = postTicketActivity(token, ticket.id, activity.id);
    promise.then(authorizedEnterActivity);
    promise.catch(deniedEnterActivity);
  }

  async function authorizedEnterActivity() {
    toast('Inscrição na atividade feita com sucesso!');
    await activityData();
    setDisableIonIcon(false);
  }

  function deniedEnterActivity(error) {
    const errorStatus = error.message.slice(-3);
    if(errorStatus === '409') {
      toast('Não foi possível inscrever na atividade, houve conflito de horários');
      setDisableIonIcon(false);
      return;
    }
    toast('Não foi possível inscrever na atividade, tente mais tarde...');
    setDisableIonIcon(false);
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
                  <ActivityBox duration={Number(activity.endDate.slice(11, 13)) -Number(activity.startDate.slice(11, 13)) }>
                    <div>{activity.name}</div>
                    <div>
                      {activity.startDate.slice(11, 16)} - {activity.endDate.slice(11, 16)}h
                    </div>
                    <ButtonSet>
                      {activity.TicketActivity.find((ticketAct) => ticketAct.ticketId === ticket.id) ? (
                        <ButtonAct
                          disabled={disableIonIcon}
                          onClick={() => {
                            entryActivity(activity, 'gray');
                          }}
                        >
                          <IoEnterOutline color="gray" size={'25px'} />
                        </ButtonAct>
                      ) : activity.capacity - activity.TicketActivity.length > 0 ? (
                        <ButtonAct
                          disabled={disableIonIcon}
                          onClick={() => {
                            entryActivity(activity, 'green');
                          }}
                        >
                          <IoEnterOutline color="green" size={'25px'} />
                        </ButtonAct>
                      ) : (
                        <AiOutlineCloseSquare color="gray" size={'22px'} />
                      )}
                      {activity.capacity - activity.TicketActivity.length > 0 ? (
                        <div>
                          {activity.capacity - activity.TicketActivity.length}/{activity.capacity} Vagas
                        </div>
                      ) : (
                        <div>Esgotado</div>
                      )}
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
  background-color: #ffffff;
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
  background-color: #e0e0e0e0;
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
