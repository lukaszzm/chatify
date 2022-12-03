import { Sidebar } from '../../../components/UI';
import { RecentMessages } from './RecentMessages';
import { SearchBar } from './SearchBar';

export const ChatList = () => {
    return (
        <Sidebar>
            <h1>Chats</h1>
            <SearchBar/>
            <h4>Recent</h4>
            <RecentMessages />
        </Sidebar>
    )
}