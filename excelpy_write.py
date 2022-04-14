from json_excel_converter import Converter
from json_excel_converter.xlsx import Writer
from json_excel_converter.xlsx.formats import Bold, Centered, Format
import xlsxwriter
import sys
import json

data = json.loads(open(sys.argv[3], "r").read())


headerFormat = (
    Centered, Bold, Format({
        'border': 1,
        'text_wrap': True
    }))

dataFormat = (
    Centered, Format({
        'text_wrap': True
    }))


def recursiveTraverse(node):
    for key, item in node.items():
        if isinstance(item, dict):
            recursiveTraverse(item)
        else:
            if isinstance(item, list):
                item = ",".join(map(str, item))
                node[key] = item


for d in data:
    for k, v in d.items():
        if isinstance(v, dict):
            recursiveTraverse(v)
        else:
            if isinstance(v, list):
                v = ",".join(map(str, v))
                d[k] = v

workbook = xlsxwriter.Workbook(sys.argv[1])
worksheet = workbook.add_worksheet(sys.argv[2])

conv = Converter()
conv.convert(data, Writer(workbook=workbook, sheet=worksheet,
                          header_formats=headerFormat, data_formats=dataFormat))

workbook.close()
