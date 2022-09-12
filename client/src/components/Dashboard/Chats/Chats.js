import Sidebar from '../../UI/Sidebar';
import RecentMessages from './RecentMessages';
import SearchBar from './SearchBar';

const Chats = () => {
    return (
        <Sidebar>
            <h1>Chats</h1>
            <SearchBar/>
            <h4>Recent</h4>
            <RecentMessages />
        </Sidebar>
    )
}

export default Chats;