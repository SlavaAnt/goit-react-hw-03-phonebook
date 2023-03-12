import React, { Component } from 'react';
import { Section } from 'components/Section/Section';
import { Form } from 'components/Form/Form';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmitForm = contact => {
    if (
      this.state.contacts.some(item => {
        return item.name === contact.name;
      })
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
    // console.log(contact);
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilterContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    console.log(contacts);

    this.setState({ contacts: contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');
    console.log(prevState);
    console.log(this.state);
    if (this.state.contacts !== prevState.contacts) {
      console.log('Новий контакт');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filterContacts = this.getFilterContact();

    return (
      <Section title={'Phonebook'}>
        <Form onSubmitProps={this.handleSubmitForm} />
        <Filter filter={filter} onChangeFilter={this.changeFilter} />
        <Contacts
          title={'Contacts'}
          contacts={filterContacts}
          onDeleteContact={this.deleteContact}
        />
      </Section>
    );
  }
}
