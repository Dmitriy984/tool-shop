export default function createCallPhoneHeader() {
    const callPhoneHeader = document.createElement("div");
    callPhoneHeader.classList.add("header__call");
    const ulCallPhone = document.createElement("ul");
    callPhoneHeader.append(ulCallPhone);

    const ulCallPhoneData = [
        { className: "header__call_phone", text: "+7 (499) 567-78-65" },
        { className: "header__call_phone", text: "8 800 570-77-77" },
        { className: "header__call_phone_notice", text: "Call is free" },
        { className: "header__call_worktime", text: "05:00AM – 10:00PM" },
    ];

    ulCallPhoneData.forEach(({ className, text }) => {
        const li = document.createElement("li");
        li.classList.add(className);
        li.textContent = text;
        ulCallPhone.append(li);
    });

    return callPhoneHeader;
}