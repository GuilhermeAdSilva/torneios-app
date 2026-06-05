import { LogIn } from 'lucide-react';

export function LogInOut() {
    return(
        <ul className='navbar-nav'>
            <NavbarItem render='true' href='/login' label={<LogIn />} />
        </ul>
    )
}