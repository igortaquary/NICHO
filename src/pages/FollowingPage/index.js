import React from 'react'
import FollowingCard from '../../components/FollowingCard'
import { useUserContext } from '../../contexts/userContext'
import { Container } from './styles'

const FollowingPage = ({navigation}) => {

    const {user} = useUserContext();

    return (
        <Container>
            {user?.seguindo && 
                user.seguindo.map(artista => (
                    <FollowingCard navigation={navigation} key={artista} artistId={artista} />
                ))
            }
            {/* <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard /> */}
        </Container>
    )
}

export default FollowingPage
