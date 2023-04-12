from django.db import models


class CycleChoicesKZ(models.TextChoices):
    OOD = 'OOD', 'ООД'
    BD = 'BD', 'БП'
    PD = 'PD', 'КП'
    DVO = 'DVO', 'ДВО'
    IA = 'IA', 'ҚА'
    Empty = 'Empty', ''


class CycleChoicesRU(models.TextChoices):
    OOD = 'OOD', 'ООД'
    BD = 'BD', 'БД'
    PD = 'PD', 'ПД'
    DVO = 'DVO', 'ДВО'
    IA = 'IA', 'ИА'
    Empty = 'Empty', ''


class CycleChoicesEN(models.TextChoices):
    OOD = 'OOD', 'OOD'
    BD = 'BD', 'BD'
    PD = 'PD', 'PD'
    DVO = 'DVO', 'DVI'
    IA = 'IA', 'FA'
    Empty = 'Empty', ''


class ComponentChoicesKZ(models.TextChoices):
    VK = 'VK', 'ЖООК'
    KV = 'KV', 'ТК'
    Empty = 'Empty', ''


class ComponentChoicesRU(models.TextChoices):
   VK = 'VK', 'ВК'
   KV = 'KV', 'КВ'
   Empty = 'Empty', ''


class ComponentChoicesEN(models.TextChoices):
    VK = 'VK', 'UK'
    KV = 'KV', 'EC'
    Empty = 'Empty', ''


class ProfessionalCompetenciesTypeChoices(models.TextChoices):
    GEN = 'General', 'Общий'
    PRO = 'Professional' , 'Профессиональный'
    NONE = 'None', 'Простой'
