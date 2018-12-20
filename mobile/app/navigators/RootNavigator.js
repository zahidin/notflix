import { StackNavigator } from 'react-navigation';

import { ContactsList, ContactsCreate, ContactsDetail } from '../contacts/screens'
import { HomePage, MoviePage, CastPage, SearchPage,UserPage, LoginPage, Welcome,CategoriesPage } from '../notflix/screen'

const RootNavigator = StackNavigator({
  ContactsList: {
    screen: ContactsList,
    navigationOptions: {
      title: 'Contacts List'
    }
  },
  ContactsCreate: {
    screen: ContactsCreate,
    navigationOptions: {
      title: 'Create Contact'
    }
  },
  ContactsDetail: {
    screen: ContactsDetail,
    navigationOptions: {
      title: 'Detail Contact'
    }
  },
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: 'Home Page',
      header: null
    }
  },
  MoviePage: {
    screen: MoviePage,
    navigationOptions: {
      title: 'Movie Page',
      header: null
    }
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      title: 'Search Page'
    }
  },
  CastPage: {
    screen: CastPage,
    navigationOptions: {
      title: 'Cast',
      header : null
    }
  },
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      title: 'Cast',
      header : null
    }
  },
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      title: 'Cast',
      header : null
    }
  },
  UserPage: {
    screen: UserPage,
    navigationOptions: {
      title: 'Cast',
      header : null
    }
  },
  CategoriesPage: {
    screen: CategoriesPage,
    navigationOptions: {
      title: 'Cast',
      header : null
    }
  }
})

export default RootNavigator
