import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

const setTopLevelNavigator = navigationRef => {
  _navigator = navigationRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};

const navigateAndDisableBackButton = routeName => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  });
  _navigator.dispatch(resetAction);
};

export default {
  navigate,
  navigateAndDisableBackButton,
  setTopLevelNavigator
};
