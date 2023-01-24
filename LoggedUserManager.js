
export default class LoggedUserManager{
    static instance;

    email = "";
    id = "";

    static getInstance() {
        if (LoggedUserManager.instance == null) {
            LoggedUserManager.instance = new LoggedUserManager();
        }

        return this.instance;
    }

    getEmail(){
        return this.email;
    }

    setEmail(email){
        this.email = email;
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }
}