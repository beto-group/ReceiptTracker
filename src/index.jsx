/**
 * Datacore Bootstrapper
 */
async function View({ folderPath }) {
    // 1. Initialize Safe Agent immediately
    const Agent = {
        timer: null,
        start: (fPath, onReload) => {
            if (Agent.timer) clearInterval(Agent.timer);
            const cmdFile = fPath + "/data/mcp_commands.json";

            Agent.timer = setInterval(async () => {
                try {
                    const adapter = dc.app.vault.adapter;
                    if (!(await adapter.exists(cmdFile))) return;

                    const content = await adapter.read(cmdFile);
                    let cmd;
                    try { cmd = JSON.parse(content); } catch (e) { return; }

                    if (cmd && cmd.executed === false) {
                        if (cmd.action === "reload") {
                            cmd.executed = true;
                            cmd.result = "Executed";
                            cmd.executedAt = new Date().toISOString();
                            await adapter.write(cmdFile, JSON.stringify(cmd, null, 2));
                            onReload();
                        }
                    }
                } catch (e) { console.error("[SafeAgent] Error", e); }
            }, 1000);
            return () => clearInterval(Agent.timer);
        }
    };

    const SafeView = () => {
        const [app, setApp] = dc.useState(null);
        const [key, setKey] = dc.useState(0);

        dc.useEffect(() => {
            const stopAgent = Agent.start(folderPath, () => {
                if (dc.app.workspace.activeLeaf?.rebuildView) {
                    dc.app.workspace.activeLeaf.rebuildView();
                } else {
                    setKey(k => k + 1);
                }
            });
            return stopAgent;
        }, []);

        dc.useEffect(() => {
            const load = async () => {
                try {
                    const { ReceiptHandlerView } = await dc.require(dc.resolvePath("RECEIPT TRACKER/src/App.jsx"));
                    setApp({ ReceiptHandlerView });
                } catch (e) {
                    console.error("Critical Load Error:", e);
                }
            };
            load();
        }, [key]);

        if (!app) return <div>Loading...</div>;

        const { ReceiptHandlerView } = app;
        return <ReceiptHandlerView key={key} folderPath={folderPath} />;
    };

    return <SafeView />;
}

return { View };
