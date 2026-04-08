export default class PrintUitls {
  /**
   * 高级打印函数
   * @param {string|HTMLElement} content - 要打印的内容（HTML字符串或DOM元素）
   * @param {Object} options - 配置选项
   * @param {string} options.title - 打印窗口标题
   * @param {boolean} options.autoPrint - 是否自动触发打印
   * @param {boolean} options.closeAfterPrint - 打印后是否关闭窗口
   */
  static advancedPrint(content, options = {}) {
    const {
      title = "打印文档",
      autoPrint = true,
      closeAfterPrint = true,
      styles = [],
    } = options;

    // 获取内容字符串
    let contentHtml;
    if (typeof content === "string") {
      contentHtml = content;
    } else if (content instanceof HTMLElement) {
      contentHtml = content.outerHTML;
    } else {
      console.error("无效的打印内容");
      return;
    }

    // 创建打印窗口
    const printWindow = window.open(
      "",
      "_blank",
      "width=1200,height=800,scrollbars=no"
    );

    if (!printWindow) {
      alert("打印窗口被浏览器阻止，请允许弹出窗口或使用其他浏览器。");
      return;
    }

    // 构建完整的HTML文档
    const printDocument = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
            <style>
                /* 打印样式 */
                @media print {
                    *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: "Microsoft YaHei", Arial, sans-serif;
                        font-size: 12pt;
                        line-height: 1.6;
                    }
                    
                    .no-print {
                        display: none !important;
                    }

                    ul,
                        ol,
                        li,
                        dl,
                        dd {
                        margin: 0;
                        padding: 0;
                    }
                        ol,
                        ul {
                        list-style: none;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 0 0;
                    }
                    
                    table, th, td {
                        
                    }
                    
                    th, td {
                        padding: 0px;
                        text-align: left;
                        word-wrap: break-word;
                        word-break: break-all;
                    }
                    
                    th {
                        background-color: #f5f5f5;
                    }
                    
                    h1, h2, h3 {
                        page-break-after: avoid;
                    }
                        h1,
                        h2,
                        h3,
                        h4,
                        h5,
                        h6,
                        p,
                        figure,
                        form,
                        blockquote {
                        margin: 0;
                        }
                        h1,
                        h2,
                        h3,
                        h4,
                        h5,
                        h6 {
                        font-weight: normal;
                        }
                        p {
                        word-wrap: break-word;
                        word-break: break-all;
                        }
                        strong,
                        b {
                        font-weight: bold;
                        }
                                            
                    img {
                        max-width: 100%;
                        height: auto;
                        border: 0;
                        vertical-align: middle;
                    }
                    
                    .page-break {
                        page-break-before: always;
                    }
                }
                
                /* 屏幕预览样式 */
                @media screen {
                    body {
                        font-family: "Microsoft YaHei", Arial, sans-serif;
                        background-color: #f0f0f0;
                    }
                    
                    .print-container {
                        background: white;
                        padding: 20px;
                        margin: 0 auto;
                        max-width: 210mm; /* A4宽度 */
                    }
                }
                
                /* 自定义样式 */
                ${styles.join("\n")}
            </style>
        </head>
        <body>
            <div class="print-container">
                ${contentHtml}
            </div>
            <script>
                // 打印控制
                ${autoPrint ? "window.onload = () => window.print();" : ""}
                
                // 打印后处理
                window.onafterprint = function() {
                    ${closeAfterPrint ? "window.close();" : ""}
                };
                
                // 提供手动打印按钮
                document.addEventListener('DOMContentLoaded', function() {
                    const printBtn = document.createElement('button');
                    printBtn.textContent = '打印文档';
                    printBtn.style.cssText = 
                        'position: fixed; top: 20px; right: 20px; padding: 10px 20px; ' +
                        'background: #007bff; color: white; border: none; border-radius: 4px; ' +
                        'cursor: pointer; z-index: 1000;';
                    printBtn.onclick = () => window.print();
                    document.body.appendChild(printBtn);
                });
            </script>
        </body>
        </html>
    `;

    // 写入内容
    printWindow.document.open();
    printWindow.document.write(printDocument);
    printWindow.document.close();

    // 返回窗口引用以便进一步控制
    return printWindow;
  }
}
