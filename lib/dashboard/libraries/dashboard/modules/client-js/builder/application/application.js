export function BuilderApplication() {

    const base = new BaseApplication(this);
    new CreateApplication(this, base);
    new ApplicationPort(this, base);

}