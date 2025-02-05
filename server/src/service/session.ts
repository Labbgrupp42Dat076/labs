import {Session} from '../model/session';

class sessionService {
    sessions: Session[] = [];

    login(name: string, password: string) {
        // do something
    }

    public async createSession(session: Session) {
        this.sessions.push(session);
        return await session;
    }

    public async getSession(id: number) {
        let session = this.sessions.find((item) => item.id === id);
        if (session) {
            if (session.expiration > Date.now()) {
                return await session;
            } else {
                await this.deleteSession(session.id);
                throw new Error('Session expired');
            }
        } else {
            throw new Error('Session not found');
        }
    }

    public async deleteSession(id: number) {
        let hasDeleted:boolean = false;
        this.sessions = this.sessions.filter((item) => {

            if(item.id !== id){
                return true;
            }else{
                hasDeleted = true;
                return false;
            }
        })

        if (!hasDeleted) {
            throw new Error('Session not found');
        }
    }

    private async updateSession(session: Session) {
        this.sessions = this.sessions.map((item) => {
            return session.id === item.id ? session : item;
        });
    }

    public async updateExpiration(id: number, expiration: number) {
        let session = this.sessions.find((item) => item.id === id);
        if (session) {
            session.expiration = expiration;
        } else {
            throw new Error('Session not found');
        }

        this.updateSession(session);

        return await session;
    }
}