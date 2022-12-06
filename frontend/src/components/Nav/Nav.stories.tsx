import { Nav } from './Nav';
import { MemoryRouter, Route, Routes } from 'react-router'

export default {
    title: 'Navigation',
    component: Nav,
    decorators: []
};

const Template = (path: string) => (
    <MemoryRouter initialEntries={[path]}>
        <Routes>
            <Route 
                element={<Nav/>}
                path='*'
            />
        </Routes>
    </MemoryRouter>
);

export const Default = Template.bind({});
Default.arguments = {
    path: '/'
}

export const Profile = Template.bind({});
Default.arguments = {
    path: '/profile'
}