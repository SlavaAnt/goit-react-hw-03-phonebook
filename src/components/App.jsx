import React, { Component } from 'react';
import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';

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

  handleSubmitForm = ({ name, phone }) => {
    if (
      this.state.contacts.some(item => {
        return item.name === name;
      })
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), name, phone };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilterContact = () => {
    const { contacts, filter } = this.state;
    // console.log(contacts);
    // console.log(filter);
    const normalizedFilter = filter.toLocaleLowerCase();
    console.log(normalizedFilter);
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
    // console.log(contacts);

    this.setState({ contacts: contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    // console.log(this.state);
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filterContacts = this.getFilterContact();

    return (
      <Section title={'Phonebook'}>
        <ContactForm onSubmitProps={this.handleSubmitForm} />
        <Filter filter={filter} onChangeFilter={this.changeFilter} />
        <ContactList
          title={'Contacts'}
          contacts={filterContacts}
          onDeleteContact={this.deleteContact}
        />
      </Section>
    );
  }
}
