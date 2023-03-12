import css from './Contacts.module.css';

export const Contacts = ({ title, contacts, onDeleteContact }) => {
  console.log(title);
  console.log(contacts);

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
