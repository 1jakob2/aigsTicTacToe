import {useState} from "react";

interface ListGroupProps{
    items: string[];
    heading: string;
}

function ListGroup(props: ListGroupProps) {
    let items = [
        'Basel',
        'Zürich',
        'Bern',
        'Luzern'
    ];
    const [selectedIndex, setSelectedIndex] = useState(-1);

    //const handleClick = (event) => console.log(event);

    return (
        <>
            <h1>List</h1>
            {items.length === 0 && <p>No item found</p>}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li
                        className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
                        key={item}
                        onClick={() => {setSelectedIndex(index);}}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup;