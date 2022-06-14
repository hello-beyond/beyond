import {beyond} from "@beyond-js/kernel/core/ts";
import {realtime, ListUpdateFilterReport} from "@beyond-js/plm/core/ts";

const {reports} = realtime;

interface RecordReport {
    table: string
    id: string | number
}

interface ListReport {
    table: string
    filter: ListUpdateFilterReport
}

(async () => {
    const library = beyond.libraries.get('@beyond-js/dashboard-lib');
    const socket = await library.socket;

    socket.on('client:plm/list/update', (message: ListReport) => reports.list.update(message.table, message.filter));
    socket.on('server:plm/list/update', (message: ListReport) => reports.list.update(message.table, message.filter));

    socket.on('client:plm/record/insert', (message: RecordReport) => reports.record.insert(message.table, message.id));
    socket.on('server:plm/record/insert', (message: RecordReport) => reports.record.insert(message.table, message.id));

    socket.on('client:plm/record/delete', (message: RecordReport) => reports.record.delete(message.table, message.id));
    socket.on('server:plm/record/delete', (message: RecordReport) => reports.record.delete(message.table, message.id));

    socket.on('client:plm/record/update', (message: RecordReport) => reports.record.update(message.table, message.id));
    socket.on('server:plm/record/update', (message: RecordReport) => reports.record.update(message.table, message.id));

    socket.on('client:plm/record/field/update', (message: RecordReport) =>
        reports.record.update(message.table, message.id, message.field, message.value));
    socket.on('server:plm/record/field/update', (message: RecordReport) =>
        reports.record.update(message.table, message.id, message.field, message.value));
})().catch(exc => console.error(exc.stack));
