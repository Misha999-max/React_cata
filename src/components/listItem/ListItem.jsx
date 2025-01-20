import Button from '../button/Button';
import './ListItem.css';

export default function ListItem({ item, onCompleted, onDelete, onChangeActive }) {
  return (
    <li>
      <div>
        <p className={item.isCompleted ? 'delete-item' : item.isActive ? 'active-item' : ''}>{item.text}</p>
        <span>Добавленно: {item.timeAdded.toLocaleTimeString()}</span>
      </div>
      <div>
        <input type="checkbox" checked={item.isActive} onChange={() => onChangeActive(item.id)} />
        <Button text="Выполнено" onClick={() => onCompleted(item.id)} />
        <Button className="deletItem" text="Delete" onClick={() => onDelete(item.id)} />
      </div>
    </li>
  );
}
