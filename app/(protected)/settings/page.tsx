import { getUser } from '@actions/getuser';
async function  SettingsPage() {
    return (
        <div>
            {
                JSON.stringify(await getUser())
            }
        </div>
    )
}

export default SettingsPage