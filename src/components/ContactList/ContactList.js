import css from './ContactList.module.css';

export const ContactList = ({ title, contacts, onDeleteContact }) => {
  return (
    <div>
      <h3 className={css.title}>{title}</h3>
      <ul>
        {contacts.map(({ id, name, phone }) => {
          return (
            <li key={id} className={css.contactBox}>
              <p>
                {name}: {phone}
              </p>
              <button onClick={() => onDeleteContact(id)} className={css.btn}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
