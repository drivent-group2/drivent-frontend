/*import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activityApi from '../../services/activityApi';

export default function useActivity(ticketTypeId) {
  const token = useToken();
  
  const {
    data: activities,
    loading: acitivtiesLoading,
    error: activitiesError,
    act: getActivities
  } = useAsync(() => activityApi.getActivities(token, ticketTypeId));

  return {
    activities,
    acitivtiesLoading,
    activitiesError,
    getActivities
  };
}*/
