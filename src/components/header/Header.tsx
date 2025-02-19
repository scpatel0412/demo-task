import { Container, Group, Button, Text, Image } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/app.store';
import logo from '../../assets/scriptAssist.png'

const Header = () => {
    const { isAuthenticated, logout } = useAuthStore()
    const navigate = useNavigate()
    return (
        <header style={{ padding: '20px 0', backgroundColor: '#f8f8f8' }}>
            <Container>
                <Group position="apart" align="center">
                    <Group>
                        <Image src={logo} alt="Logo" width={40} />
                        <Text size="xl" weight={700}>Interview Task</Text>
                    </Group>

                    <Group spacing={30}>
                        <Button variant="subtle" component={Link} to="/launches">Launches</Button>
                        {isAuthenticated && <Button type='button' onClick={() => {
                            logout()
                            navigate('/')
                        }}>Logout</Button>}
                    </Group>
                </Group>
            </Container>
        </header>
    );
}

export default Header;
