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
            return await session;
        } else {
            throw new Error('Session not found');
        }
    }

    public async deleteSession(id: number) {
        this.sessions = this.sessions.filter((item) => item.id !== id);
        if (this.sessions.length === 0) {
            throw new Error('No session found');
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