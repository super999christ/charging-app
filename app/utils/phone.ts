export const formatPhoneNumber = (phoneNumber: string, delimiter: string = ' ') => {
  if (phoneNumber.length !== 10)
    return phoneNumber;
  return phoneNumber.slice(0, 3) + delimiter + phoneNumber.slice(3, 6) + delimiter + phoneNumber.slice(6, 10);
}