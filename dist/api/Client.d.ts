import { Page } from 'puppeteer';
import { Chat, LiveLocationChangedEvent, ChatState } from './model/chat';
import { Contact } from './model/contact';
import { Message } from './model/message';
import { ParticipantChangedEventModel } from './model/group-metadata';
import { ConfigObject } from './model';
import { SessionInfo } from './model/sessionInfo';
import { ChatId, GroupChatId, Content, Base64, MessageId, ContactId, DataURL, FilePath } from './model/aliases';
import { CustomProduct } from './model/product';
export declare enum namespace {
    Chat = "Chat",
    Msg = "Msg",
    Contact = "Contact",
    GroupMetadata = "GroupMetadata"
}
export declare enum SimpleListener {
    Message = "onMessage",
    AnyMessage = "onAnyMessage",
    Ack = "onAck",
    AddedToGroup = "onAddedToGroup",
    Battery = "onBattery",
    ChatOpened = "onChatOpened",
    IncomingCall = "onIncomingCall",
    GlobalParicipantsChanged = "onGlobalParicipantsChanged",
    ChatState = "onChatState",
    Plugged = "onPlugged",
    StateChanged = "onStateChanged",
    Story = "onStory",
    RemovedFromGroup = "onRemovedFromGroup",
    ContactAdded = "onContactAdded"
}
export declare class Client {
    private _loadedModules;
    private _registeredWebhooks;
    private _webhookQueue;
    private _createConfig;
    private _sessionInfo;
    private _listeners;
    private _page;
    constructor(page: Page, createConfig: ConfigObject, sessionInfo: SessionInfo);
    getSessionId(): string;
    getPage(): Page;
    private _setOnClose;
    private _reInjectWapi;
    private _reRegisterListeners;
    refresh(): Promise<boolean>;
    getSessionInfo(): SessionInfo;
    getConfig(): {
        [x: string]: any;
        useStealth?: boolean;
        sessionDataPath?: string;
        bypassCSP?: boolean;
        chromiumArgs?: string[];
        skipBrokenMethodsCheck?: boolean;
        sessionId?: string;
        licenseKey?: string | string[];
        customUserAgent?: string;
        blockCrashLogs?: boolean;
        cacheEnabled?: boolean;
        browserRevision?: string;
        throwErrorOnTosBlock?: boolean;
        headless?: boolean;
        autoRefresh?: boolean;
        qrRefreshS?: number;
        qrTimeout?: number;
        executablePath?: string;
        useChrome?: boolean;
        qrLogSkip?: boolean;
        disableSpins?: boolean;
        logConsole?: boolean;
        logConsoleErrors?: boolean;
        authTimeout?: number;
        killProcessOnBrowserClose?: boolean;
        safeMode?: boolean;
        skipSessionSave?: boolean;
        popup?: number | boolean;
        inDocker?: boolean;
        qrQuality?: import("./model").QRQuality;
        qrFormat?: import("./model").QRFormat;
        hostNotificationLang?: import("./model").NotificationLanguage;
        blockAssets?: boolean;
        corsFix?: boolean;
    };
    private pup;
    private registerListener;
    onMessage(fn: (message: Message) => void): Promise<any>;
    onAnyMessage(fn: (message: Message) => void): Promise<any>;
    onBattery(fn: (battery: number) => void): Promise<any>;
    onPlugged(fn: (plugged: boolean) => void): Promise<any>;
    onStory(fn: (story: any) => void): Promise<any>;
    onStateChanged(fn: (state: string) => void): Promise<any>;
    onIncomingCall(fn: (call: any) => void): Promise<any>;
    onChatState(fn: (chatState: any) => void): Promise<any>;
    onAck(fn: (message: Message) => void): Promise<any>;
    onGlobalParicipantsChanged(fn: (participantChangedEvent: ParticipantChangedEventModel) => void): Promise<any>;
    onAddedToGroup(fn: (chat: Chat) => any): Promise<any>;
    onRemovedFromGroup(fn: (chat: Chat) => any): Promise<any>;
    onChatOpened(fn: (chat: Chat) => any): Promise<any>;
    onContactAdded(fn: (chat: Chat) => any): Promise<any>;
    onParticipantsChanged(groupId: GroupChatId, fn: (participantChangedEvent: ParticipantChangedEventModel) => void, useLegancyMethod?: boolean): Promise<any>;
    onLiveLocation(chatId: ChatId, fn: (liveLocationChangedEvent: LiveLocationChangedEvent) => void): Promise<any>;
    setPresence(available: boolean): Promise<any>;
    setMyStatus(newStatus: string): Promise<any>;
    addLabel(label: string, id: string): Promise<boolean>;
    removeLabel(label: string, id: string): Promise<boolean>;
    sendVCard(chatId: ChatId, vcard: string, contactName: string, contactNumber?: string): Promise<boolean>;
    setMyName(newName: string): Promise<boolean>;
    setChatState(chatState: ChatState, chatId: ChatId): Promise<any>;
    getConnectionState(): Promise<string>;
    getChatWithNonContacts(): Promise<Contact[]>;
    kill(): Promise<boolean>;
    forceRefocus(): Promise<unknown>;
    forceUpdateLiveLocation(chatId: ChatId): Promise<any>;
    sendText(to: ChatId, content: Content): Promise<string | boolean>;
    sendTextWithMentions(to: ChatId, content: Content): Promise<string>;
    sendReplyWithMentions(to: ChatId, content: Content, replyMessageId: MessageId): Promise<string>;
    tagEveryone(groupId: GroupChatId, content: Content): Promise<string>;
    sendMessageWithThumb(thumb: string, url: string, title: string, description: string, text: Content, chatId: ChatId): Promise<boolean>;
    sendLocation(to: ChatId, lat: any, lng: any, loc: string): Promise<string>;
    getGeneratedUserAgent(userA?: string): Promise<string>;
    decryptMedia(message: Message | MessageId): Promise<string | false>;
    sendImage(to: ChatId, file: DataURL | FilePath, filename: string, caption: Content, quotedMsgId?: MessageId, waitForId?: boolean, ptt?: boolean): Promise<string | boolean>;
    sendYoutubeLink(to: ChatId, url: string, text?: Content): Promise<string | boolean>;
    sendLinkWithAutoPreview(to: ChatId, url: string, text?: Content): Promise<string | boolean>;
    reply(to: ChatId, content: Content, quotedMsgId: MessageId, sendSeen?: boolean): Promise<string | boolean>;
    sendFile(to: ChatId, file: DataURL | FilePath, filename: string, caption: Content, quotedMsgId?: MessageId, waitForId?: boolean): Promise<string | boolean>;
    sendPtt(to: ChatId, file: DataURL | FilePath, quotedMsgId: MessageId): Promise<string | boolean>;
    sendVideoAsGif(to: ChatId, file: DataURL | FilePath, filename: string, caption: Content, quotedMsgId?: MessageId): Promise<string>;
    sendGiphy(to: ChatId, giphyMediaUrl: string, caption: Content): Promise<string>;
    sendFileFromUrl(to: ChatId, url: string, filename: string, caption: Content, quotedMsgId?: MessageId, requestConfig?: any, waitForId?: boolean): Promise<string | boolean>;
    getMe(): Promise<any>;
    getSnapshot(): Promise<string>;
    iAmAdmin(): Promise<string[]>;
    syncContacts(): Promise<boolean>;
    getAmountOfLoadedMessages(): Promise<number>;
    getBusinessProfilesProducts(id: ContactId): Promise<any>;
    sendImageWithProduct(to: ChatId, base64: Base64, caption: Content, bizNumber: ContactId, productId: string): Promise<any>;
    sendCustomProduct(to: ChatId, image: DataURL, productData: CustomProduct): Promise<string | boolean>;
    sendContact(to: ChatId, contactId: ContactId | ContactId[]): Promise<any>;
    simulateTyping(to: ChatId, on: boolean): Promise<boolean>;
    archiveChat(id: ChatId, archive: boolean): Promise<boolean>;
    forwardMessages(to: ChatId, messages: MessageId | MessageId[], skipMyMessages: boolean): Promise<any>;
    ghostForward(to: ChatId, messageId: MessageId): Promise<boolean>;
    getAllContacts(): Promise<Contact[]>;
    getWAVersion(): Promise<string>;
    isConnected(): Promise<boolean>;
    getBatteryLevel(): Promise<number>;
    getIsPlugged(): Promise<boolean>;
    getHostNumber(): Promise<string>;
    getAllChats(withNewMessageOnly?: boolean): Promise<any>;
    getAllChatIds(): Promise<string[]>;
    getBlockedIds(): Promise<string[]>;
    getAllChatsWithMessages(withNewMessageOnly?: boolean): Promise<Chat[]>;
    getAllGroups(withNewMessagesOnly?: boolean): Promise<Chat[]>;
    getGroupMembersId(groupId: GroupChatId): Promise<string[]>;
    joinGroupViaLink(link: string): Promise<string | number | boolean>;
    contactBlock(id: ContactId): Promise<any>;
    contactUnblock(id: ContactId): Promise<boolean>;
    leaveGroup(groupId: GroupChatId): Promise<any>;
    getVCards(msgId: MessageId): Promise<any>;
    getGroupMembers(groupId: GroupChatId): Promise<Contact[]>;
    getContact(contactId: ContactId): Promise<Contact>;
    getChatById(contactId: ContactId): Promise<Chat>;
    getMessageById(messageId: MessageId): Promise<Message>;
    getStickerDecryptable(messageId: MessageId): Promise<false | Message>;
    forceStaleMediaUpdate(messageId: MessageId): Promise<false | Message>;
    getChat(contactId: ContactId): Promise<Chat>;
    getCommonGroups(contactId: ContactId): Promise<{
        id: string;
        title: string;
    }[]>;
    getLastSeen(chatId: ChatId): Promise<number | boolean>;
    getProfilePicFromServer(chatId: ChatId): Promise<any>;
    sendSeen(chatId: ChatId): Promise<boolean>;
    markAsUnread(chatId: ChatId): Promise<boolean>;
    isChatOnline(chatId: ChatId): Promise<boolean>;
    loadEarlierMessages(contactId: ContactId): Promise<Message[]>;
    getStatus(contactId: ContactId): Promise<{
        id: string;
        status: string;
    }>;
    loadAllEarlierMessages(contactId: ContactId): Promise<any>;
    deleteChat(chatId: ChatId): Promise<boolean>;
    clearChat(chatId: ChatId): Promise<any>;
    getGroupInviteLink(chatId: ChatId): Promise<string>;
    inviteInfo(link: string): Promise<any>;
    revokeGroupInviteLink(chatId: ChatId): Promise<string | boolean>;
    deleteMessage(contactId: ContactId, messageId: MessageId[] | MessageId, onlyLocal?: boolean): Promise<any>;
    checkNumberStatus(contactId: ContactId): Promise<any>;
    getUnreadMessages(includeMe: boolean, includeNotifications: boolean, use_unread_count: boolean): Promise<any>;
    getAllNewMessages(): Promise<Message[]>;
    getAllUnreadMessages(): Promise<Message[]>;
    getIndicatedNewMessages(): Promise<Message[]>;
    getAllMessagesInChat(chatId: ChatId, includeMe: boolean, includeNotifications: boolean): Promise<any>;
    loadAndGetAllMessagesInChat(chatId: ChatId, includeMe: boolean, includeNotifications: boolean): Promise<Message[]>;
    createGroup(groupName: string, contacts: ContactId | ContactId[]): Promise<any>;
    removeParticipant(groupId: GroupChatId, participantId: ContactId): Promise<boolean>;
    setGroupIcon(groupId: GroupChatId, b64: Base64): Promise<boolean>;
    setGroupIconByUrl(groupId: GroupChatId, url: string, requestConfig?: any): Promise<boolean>;
    addParticipant(groupId: GroupChatId, participantId: ContactId): Promise<any>;
    promoteParticipant(groupId: GroupChatId, participantId: ContactId): Promise<boolean>;
    demoteParticipant(groupId: GroupChatId, participantId: ContactId): Promise<boolean>;
    setGroupToAdminsOnly(groupId: GroupChatId, onlyAdmins: boolean): Promise<boolean>;
    setGroupEditToAdminsOnly(groupId: GroupChatId, onlyAdmins: boolean): Promise<boolean>;
    setGroupDescription(groupId: GroupChatId, description: string): Promise<boolean>;
    setGroupTitle(groupId: GroupChatId, title: string): Promise<boolean>;
    getGroupAdmins(groupId: GroupChatId): Promise<Contact[]>;
    setChatBackgroundColourHex(hex: string): Promise<boolean>;
    darkMode(activate: boolean): Promise<boolean>;
    getMessageReaders(messageId: MessageId): Promise<Contact[]>;
    sendStickerfromUrl(to: ChatId, url: string, requestConfig?: any): Promise<any>;
    sendStickerfromUrlAsReply(to: ChatId, url: string, messageId: MessageId, requestConfig?: any): Promise<any>;
    sendImageAsStickerAsReply(to: ChatId, b64: DataURL, messageId: MessageId): Promise<any>;
    getSingleProperty(namespace: namespace, id: string, property: string): Promise<any>;
    private prepareWebp;
    sendImageAsSticker(to: ChatId, b64: DataURL): Promise<any>;
    sendRawWebpAsSticker(to: ChatId, webpBase64: Base64): Promise<any>;
    sendGiphyAsSticker(to: ChatId, giphyMediaUrl: URL | string): Promise<any>;
    postTextStatus(text: Content, textRgba: string, backgroundRgba: string, font: number): Promise<string | boolean>;
    postImageStatus(data: DataURL, caption: Content): Promise<string | boolean>;
    postVideoStatus(data: DataURL, caption: Content): Promise<string | boolean>;
    deleteStatus(statusesToDelete: string | string[]): Promise<any>;
    deleteAllStatus(): Promise<any>;
    getMyStatusArray(): Promise<any>;
    getStoryViewers(id: string): Promise<string[]>;
    clearAllChats(): Promise<any>;
    cutMsgCache(): Promise<any>;
    downloadProfilePicFromMessage(message: Message): Promise<any>;
    downloadFileWithCredentials(url: string): Promise<any>;
    setProfilePic(data: DataURL): Promise<boolean>;
    middleware: (useSessionIdInPath?: boolean) => (req: any, res: any, next: any) => Promise<any>;
    registerWebhook(event: SimpleListener, url: string, requestConfig?: any, concurrency?: number): Promise<any>;
}
export { useragent } from '../config/puppeteer.config';
