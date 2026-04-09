# Funciòn para validar un listo de mails
def validar_mails(mails):
    validos = []
    for mail in mails:
        if "@" in mail and "." in mail:
            validos.append(mail)
    return validos

# Funciòn para validar un numero de telefono
def validar_telefono(telefono):
    if telefono.isdigit() and len(telefono) == 10:
        return True
    return False

# Funciòn para validar una fecha en formato dd/mm/yyyy
def validar_fecha(fecha):
    try:
        dia, mes, año = map(int, fecha.split('/'))
        if 1 <= dia <= 31 and 1 <= mes <= 12 and año > 0:
            return True
    except ValueError:
        pass                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    return False

    