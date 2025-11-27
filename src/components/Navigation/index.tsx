import { useState } from "react"

interface NavItem {
    id: string;
    label: string;
    icon: string;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'CS Model', icon: '' },
];

export const Navigation = () => {
    const [activeItem, setActiveItem] = useState('home');

    return (
        <nav className="mb-4">
            {navItems.map((item) => (
                <div
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`d-flex align-items-center gap-2 p-3 mb-2 rounded cursor-pointer ${activeItem === item.id ? 'bg-primary text-white' : 'bg-light'
                        }`}
                    style={{ cursor: 'pointer' }}
                >
                    <span>{item.icon}</span>
                    <span className={activeItem === item.id ? 'fw-bold' : ''}>{item.label}</span>
                </div>
            ))}
        </nav>
    );
}