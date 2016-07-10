namespace _06_Access_Chart_Simple
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series1 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea2 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend2 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series2 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Series series3 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Series series4 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea3 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend3 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series5 = new System.Windows.Forms.DataVisualization.Charting.Series();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.chart2 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.frequencyBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.myDatasetFrequency = new _06_Access_Chart_Simple.OpenVibeDataSet1();
            this.btnCSV2 = new System.Windows.Forms.Button();
            this.chart1 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.dataGridView2 = new System.Windows.Forms.DataGridView();
            this.bntAnalyze = new System.Windows.Forms.Button();
            this.btnExport = new System.Windows.Forms.Button();
            this.lblSeconds = new System.Windows.Forms.Label();
            this.lblLines = new System.Windows.Forms.Label();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.settingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.backgroundColorToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.setImportExportDefaultFolderToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.aboutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.aboutToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.helpToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.colorDialog1 = new System.Windows.Forms.ColorDialog();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.btnImportSine = new System.Windows.Forms.Button();
            this.btnImportReader = new System.Windows.Forms.Button();
            this.lblImportFile = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.btnColor = new System.Windows.Forms.Button();
            this.lblDefault = new System.Windows.Forms.Label();
            this.btnDefault = new System.Windows.Forms.Button();
            this.folderBrowserDialog1 = new System.Windows.Forms.FolderBrowserDialog();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.lblExportedFreq = new System.Windows.Forms.Label();
            this.btnFrequency = new System.Windows.Forms.Button();
            this.lblAnalyze = new System.Windows.Forms.Label();
            this.lblExported = new System.Windows.Forms.Label();
            this.openVibeDataSet = new _06_Access_Chart_Simple.OpenVibeDataSet();
            this.openVibeRawBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.openVibeRawTableAdapter = new _06_Access_Chart_Simple.OpenVibeDataSetTableAdapters.OpenVibeRawTableAdapter();
            this.openVibeDataSetFFT = new _06_Access_Chart_Simple.OpenVibeDataSet();
            this.openVibeRawBindingSourceFFT = new System.Windows.Forms.BindingSource(this.components);
            this.openVibeRawTableAdapterFFT = new _06_Access_Chart_Simple.OpenVibeDataSetTableAdapters.OpenVibeRawTableAdapter();
            this.chartFFT = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.dataGridView3 = new System.Windows.Forms.DataGridView();
            this.mybleAdapterFrequency = new _06_Access_Chart_Simple.OpenVibeDataSetTableAdapters.OpenVibeRawTableAdapter();
            this.lblExportedBands = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.frequencyBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.myDatasetFrequency)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView2)).BeginInit();
            this.menuStrip1.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.openVibeDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.openVibeRawBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.openVibeDataSetFFT)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.openVibeRawBindingSourceFFT)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chartFFT)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView3)).BeginInit();
            this.SuspendLayout();
            // 
            // dataGridView1
            // 
            this.dataGridView1.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.ColumnHeader;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(629, 39);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.Size = new System.Drawing.Size(397, 152);
            this.dataGridView1.TabIndex = 0;
            this.dataGridView1.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellContentClick);
            // 
            // chart2
            // 
            chartArea1.Name = "ChartArea1";
            this.chart2.ChartAreas.Add(chartArea1);
            this.chart2.DataSource = this.frequencyBindingSource;
            legend1.Name = "Legend1";
            this.chart2.Legends.Add(legend1);
            this.chart2.Location = new System.Drawing.Point(16, 399);
            this.chart2.Name = "chart2";
            series1.ChartArea = "ChartArea1";
            series1.Legend = "Legend1";
            series1.Name = "Frequency";
            this.chart2.Series.Add(series1);
            this.chart2.Size = new System.Drawing.Size(232, 171);
            this.chart2.TabIndex = 1;
            this.chart2.Text = "chart1";
            this.chart2.Click += new System.EventHandler(this.chart1_Click);
            // 
            // frequencyBindingSource
            // 
            this.frequencyBindingSource.DataSource = this.myDatasetFrequency;
            this.frequencyBindingSource.Position = 0;
            // 
            // myDatasetFrequency
            // 
            this.myDatasetFrequency.DataSetName = "myDatasetFrequency";
            this.myDatasetFrequency.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // btnCSV2
            // 
            this.btnCSV2.Location = new System.Drawing.Point(31, 113);
            this.btnCSV2.Name = "btnCSV2";
            this.btnCSV2.Size = new System.Drawing.Size(102, 49);
            this.btnCSV2.TabIndex = 5;
            this.btnCSV2.Text = "Import OpenVibe CSV File";
            this.btnCSV2.UseVisualStyleBackColor = true;
            this.btnCSV2.Click += new System.EventHandler(this.btnCSV2_Click);
            // 
            // chart1
            // 
            chartArea2.Name = "ChartArea1";
            this.chart1.ChartAreas.Add(chartArea2);
            legend2.Name = "Legend1";
            this.chart1.Legends.Add(legend2);
            this.chart1.Location = new System.Drawing.Point(523, 350);
            this.chart1.Name = "chart1";
            series2.ChartArea = "ChartArea1";
            series2.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Line;
            series2.Legend = "Legend1";
            series2.Name = "Electrode";
            series3.ChartArea = "ChartArea1";
            series3.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Line;
            series3.Legend = "Legend1";
            series3.Name = "Attention";
            series4.ChartArea = "ChartArea1";
            series4.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Line;
            series4.Legend = "Legend1";
            series4.Name = "Meditation";
            this.chart1.Series.Add(series2);
            this.chart1.Series.Add(series3);
            this.chart1.Series.Add(series4);
            this.chart1.Size = new System.Drawing.Size(265, 220);
            this.chart1.TabIndex = 6;
            this.chart1.Text = "chart2";
            this.chart1.Click += new System.EventHandler(this.chart2_Click);
            // 
            // dataGridView2
            // 
            this.dataGridView2.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.ColumnHeader;
            this.dataGridView2.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView2.Location = new System.Drawing.Point(521, 207);
            this.dataGridView2.Name = "dataGridView2";
            this.dataGridView2.Size = new System.Drawing.Size(509, 129);
            this.dataGridView2.TabIndex = 7;
            this.dataGridView2.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView2_CellContentClick);
            // 
            // bntAnalyze
            // 
            this.bntAnalyze.Location = new System.Drawing.Point(31, 209);
            this.bntAnalyze.Name = "bntAnalyze";
            this.bntAnalyze.Size = new System.Drawing.Size(102, 60);
            this.bntAnalyze.TabIndex = 8;
            this.bntAnalyze.Text = "Calculate FFT and Amplitude - add Frequency Index";
            this.bntAnalyze.UseVisualStyleBackColor = true;
            this.bntAnalyze.Click += new System.EventHandler(this.bntAnalyze_Click);
            // 
            // btnExport
            // 
            this.btnExport.Location = new System.Drawing.Point(31, 324);
            this.btnExport.Name = "btnExport";
            this.btnExport.Size = new System.Drawing.Size(102, 27);
            this.btnExport.TabIndex = 11;
            this.btnExport.Text = "Export Results";
            this.btnExport.UseVisualStyleBackColor = true;
            this.btnExport.Click += new System.EventHandler(this.btnExport_Click);
            // 
            // lblSeconds
            // 
            this.lblSeconds.AutoSize = true;
            this.lblSeconds.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lblSeconds.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblSeconds.Location = new System.Drawing.Point(257, 40);
            this.lblSeconds.Name = "lblSeconds";
            this.lblSeconds.Size = new System.Drawing.Size(189, 16);
            this.lblSeconds.TabIndex = 12;
            this.lblSeconds.Text = "Number of Seconds Imported: ";
            this.lblSeconds.Click += new System.EventHandler(this.lblSeconds_Click);
            // 
            // lblLines
            // 
            this.lblLines.AutoSize = true;
            this.lblLines.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lblLines.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblLines.Location = new System.Drawing.Point(257, 21);
            this.lblLines.MaximumSize = new System.Drawing.Size(200, 0);
            this.lblLines.Name = "lblLines";
            this.lblLines.Size = new System.Drawing.Size(167, 16);
            this.lblLines.TabIndex = 13;
            this.lblLines.Text = "Number of Lines Imported: ";
            this.lblLines.Click += new System.EventHandler(this.lblLines_Click);
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.settingsToolStripMenuItem,
            this.aboutToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(1048, 24);
            this.menuStrip1.TabIndex = 14;
            this.menuStrip1.Text = "menuStrip1";
            this.menuStrip1.ItemClicked += new System.Windows.Forms.ToolStripItemClickedEventHandler(this.menuStrip1_ItemClicked);
            // 
            // settingsToolStripMenuItem
            // 
            this.settingsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.backgroundColorToolStripMenuItem,
            this.setImportExportDefaultFolderToolStripMenuItem});
            this.settingsToolStripMenuItem.Name = "settingsToolStripMenuItem";
            this.settingsToolStripMenuItem.Size = new System.Drawing.Size(61, 20);
            this.settingsToolStripMenuItem.Text = "Settings";
            this.settingsToolStripMenuItem.Click += new System.EventHandler(this.settingsToolStripMenuItem_Click);
            // 
            // backgroundColorToolStripMenuItem
            // 
            this.backgroundColorToolStripMenuItem.Name = "backgroundColorToolStripMenuItem";
            this.backgroundColorToolStripMenuItem.Size = new System.Drawing.Size(244, 22);
            this.backgroundColorToolStripMenuItem.Text = "Background Color";
            this.backgroundColorToolStripMenuItem.Click += new System.EventHandler(this.backgroundColorToolStripMenuItem_Click);
            // 
            // setImportExportDefaultFolderToolStripMenuItem
            // 
            this.setImportExportDefaultFolderToolStripMenuItem.Name = "setImportExportDefaultFolderToolStripMenuItem";
            this.setImportExportDefaultFolderToolStripMenuItem.Size = new System.Drawing.Size(244, 22);
            this.setImportExportDefaultFolderToolStripMenuItem.Text = "Set Import/Export Default Folder";
            this.setImportExportDefaultFolderToolStripMenuItem.Click += new System.EventHandler(this.setImportExportDefaultFolderToolStripMenuItem_Click);
            // 
            // aboutToolStripMenuItem
            // 
            this.aboutToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.aboutToolStripMenuItem1,
            this.helpToolStripMenuItem});
            this.aboutToolStripMenuItem.Name = "aboutToolStripMenuItem";
            this.aboutToolStripMenuItem.Size = new System.Drawing.Size(52, 20);
            this.aboutToolStripMenuItem.Text = "About";
            // 
            // aboutToolStripMenuItem1
            // 
            this.aboutToolStripMenuItem1.Name = "aboutToolStripMenuItem1";
            this.aboutToolStripMenuItem1.Size = new System.Drawing.Size(107, 22);
            this.aboutToolStripMenuItem1.Text = "About";
            this.aboutToolStripMenuItem1.Click += new System.EventHandler(this.aboutToolStripMenuItem1_Click);
            // 
            // helpToolStripMenuItem
            // 
            this.helpToolStripMenuItem.Name = "helpToolStripMenuItem";
            this.helpToolStripMenuItem.Size = new System.Drawing.Size(107, 22);
            this.helpToolStripMenuItem.Text = "Help";
            this.helpToolStripMenuItem.Click += new System.EventHandler(this.helpToolStripMenuItem_Click);
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btnImportSine);
            this.groupBox1.Controls.Add(this.btnImportReader);
            this.groupBox1.Controls.Add(this.lblImportFile);
            this.groupBox1.Controls.Add(this.lblLines);
            this.groupBox1.Controls.Add(this.lblSeconds);
            this.groupBox1.Location = new System.Drawing.Point(16, 97);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(592, 96);
            this.groupBox1.TabIndex = 15;
            this.groupBox1.TabStop = false;
            this.groupBox1.Enter += new System.EventHandler(this.groupBox1_Enter);
            // 
            // btnImportSine
            // 
            this.btnImportSine.Location = new System.Drawing.Point(452, 19);
            this.btnImportSine.Name = "btnImportSine";
            this.btnImportSine.Size = new System.Drawing.Size(105, 49);
            this.btnImportSine.TabIndex = 17;
            this.btnImportSine.Text = "Import Sine CSV File";
            this.btnImportSine.UseVisualStyleBackColor = true;
            this.btnImportSine.Click += new System.EventHandler(this.btnImportSine_Click);
            // 
            // btnImportReader
            // 
            this.btnImportReader.Location = new System.Drawing.Point(130, 16);
            this.btnImportReader.Name = "btnImportReader";
            this.btnImportReader.Size = new System.Drawing.Size(105, 49);
            this.btnImportReader.TabIndex = 16;
            this.btnImportReader.Text = "Import Mindwave Reader512 CSV File";
            this.btnImportReader.UseVisualStyleBackColor = true;
            this.btnImportReader.Click += new System.EventHandler(this.btnImportReader_Click);
            // 
            // lblImportFile
            // 
            this.lblImportFile.AutoSize = true;
            this.lblImportFile.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lblImportFile.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblImportFile.Location = new System.Drawing.Point(17, 71);
            this.lblImportFile.Name = "lblImportFile";
            this.lblImportFile.Size = new System.Drawing.Size(65, 15);
            this.lblImportFile.TabIndex = 14;
            this.lblImportFile.Text = "Import File";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.btnColor);
            this.groupBox2.Controls.Add(this.lblDefault);
            this.groupBox2.Location = new System.Drawing.Point(16, 31);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(501, 63);
            this.groupBox2.TabIndex = 16;
            this.groupBox2.TabStop = false;
            this.groupBox2.Enter += new System.EventHandler(this.groupBox2_Enter);
            // 
            // btnColor
            // 
            this.btnColor.Location = new System.Drawing.Point(17, 15);
            this.btnColor.Name = "btnColor";
            this.btnColor.Size = new System.Drawing.Size(73, 38);
            this.btnColor.TabIndex = 15;
            this.btnColor.Text = "Background Color";
            this.btnColor.UseVisualStyleBackColor = true;
            this.btnColor.Click += new System.EventHandler(this.btnColor_Click);
            // 
            // lblDefault
            // 
            this.lblDefault.AutoSize = true;
            this.lblDefault.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lblDefault.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblDefault.Location = new System.Drawing.Point(257, 19);
            this.lblDefault.MaximumSize = new System.Drawing.Size(500, 0);
            this.lblDefault.Name = "lblDefault";
            this.lblDefault.Size = new System.Drawing.Size(61, 15);
            this.lblDefault.TabIndex = 14;
            this.lblDefault.Text = "Computer";
            this.lblDefault.Click += new System.EventHandler(this.lblDefault_Click);
            // 
            // btnDefault
            // 
            this.btnDefault.Location = new System.Drawing.Point(115, 48);
            this.btnDefault.Name = "btnDefault";
            this.btnDefault.Size = new System.Drawing.Size(147, 36);
            this.btnDefault.TabIndex = 17;
            this.btnDefault.Text = "Set Import / Export Default Folder";
            this.btnDefault.UseVisualStyleBackColor = true;
            this.btnDefault.Click += new System.EventHandler(this.btnDefault_Click);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.lblExportedBands);
            this.groupBox3.Controls.Add(this.lblExportedFreq);
            this.groupBox3.Controls.Add(this.btnFrequency);
            this.groupBox3.Controls.Add(this.lblAnalyze);
            this.groupBox3.Controls.Add(this.lblExported);
            this.groupBox3.Location = new System.Drawing.Point(16, 197);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(488, 188);
            this.groupBox3.TabIndex = 18;
            this.groupBox3.TabStop = false;
            this.groupBox3.Enter += new System.EventHandler(this.groupBox3_Enter);
            // 
            // lblExportedFreq
            // 
            this.lblExportedFreq.AutoSize = true;
            this.lblExportedFreq.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lblExportedFreq.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblExportedFreq.Location = new System.Drawing.Point(126, 132);
            this.lblExportedFreq.Name = "lblExportedFreq";
            this.lblExportedFreq.Size = new System.Drawing.Size(99, 15);
            this.lblExportedFreq.TabIndex = 17;
            this.lblExportedFreq.Text = "And Exported to: ";
            // 
            // btnFrequency
            // 
            this.btnFrequency.Location = new System.Drawing.Point(14, 77);
            this.btnFrequency.Name = "btnFrequency";
            this.btnFrequency.Size = new System.Drawing.Size(102, 42);
            this.btnFrequency.TabIndex = 16;
            this.btnFrequency.Text = "Calculate Fequency";
            this.btnFrequency.UseVisualStyleBackColor = true;
            this.btnFrequency.Click += new System.EventHandler(this.btnFrequency_Click);
            // 
            // lblAnalyze
            // 
            this.lblAnalyze.AutoSize = true;
            this.lblAnalyze.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lblAnalyze.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblAnalyze.Location = new System.Drawing.Point(126, 21);
            this.lblAnalyze.Name = "lblAnalyze";
            this.lblAnalyze.Size = new System.Drawing.Size(65, 15);
            this.lblAnalyze.TabIndex = 15;
            this.lblAnalyze.Text = "Import File";
            // 
            // lblExported
            // 
            this.lblExported.AutoSize = true;
            this.lblExported.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lblExported.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblExported.Location = new System.Drawing.Point(127, 104);
            this.lblExported.Name = "lblExported";
            this.lblExported.Size = new System.Drawing.Size(75, 15);
            this.lblExported.TabIndex = 14;
            this.lblExported.Text = "Exported to: ";
            this.lblExported.Click += new System.EventHandler(this.lblExported_Click);
            // 
            // openVibeDataSet
            // 
            this.openVibeDataSet.DataSetName = "OpenVibeDataSet";
            this.openVibeDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // openVibeRawBindingSource
            // 
            this.openVibeRawBindingSource.DataMember = "OpenVibeRaw";
            this.openVibeRawBindingSource.DataSource = this.openVibeDataSet;
            // 
            // openVibeRawTableAdapter
            // 
            this.openVibeRawTableAdapter.ClearBeforeFill = true;
            // 
            // openVibeDataSetFFT
            // 
            this.openVibeDataSetFFT.DataSetName = "OpenVibeDataSet";
            this.openVibeDataSetFFT.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // openVibeRawBindingSourceFFT
            // 
            this.openVibeRawBindingSourceFFT.DataMember = "OpenVibeRaw";
            this.openVibeRawBindingSourceFFT.DataSource = this.openVibeDataSet;
            // 
            // openVibeRawTableAdapterFFT
            // 
            this.openVibeRawTableAdapterFFT.ClearBeforeFill = true;
            // 
            // chartFFT
            // 
            chartArea3.Name = "ChartArea1";
            this.chartFFT.ChartAreas.Add(chartArea3);
            legend3.Name = "Legend1";
            this.chartFFT.Legends.Add(legend3);
            this.chartFFT.Location = new System.Drawing.Point(797, 352);
            this.chartFFT.Name = "chartFFT";
            series5.ChartArea = "ChartArea1";
            series5.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Line;
            series5.Legend = "Legend1";
            series5.Name = "Amplitude";
            this.chartFFT.Series.Add(series5);
            this.chartFFT.Size = new System.Drawing.Size(233, 219);
            this.chartFFT.TabIndex = 19;
            this.chartFFT.Text = "chart2";
            this.chartFFT.Click += new System.EventHandler(this.chartFFT_Click);
            // 
            // textBox1
            // 
            this.textBox1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.textBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)), true);
            this.textBox1.Location = new System.Drawing.Point(530, 39);
            this.textBox1.Multiline = true;
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(76, 55);
            this.textBox1.TabIndex = 20;
            this.textBox1.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // dataGridView3
            // 
            this.dataGridView3.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.ColumnHeader;
            this.dataGridView3.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView3.Location = new System.Drawing.Point(265, 402);
            this.dataGridView3.Name = "dataGridView3";
            this.dataGridView3.Size = new System.Drawing.Size(236, 166);
            this.dataGridView3.TabIndex = 21;
            // 
            // mybleAdapterFrequency
            // 
            this.mybleAdapterFrequency.ClearBeforeFill = true;
            // 
            // lblExportedBands
            // 
            this.lblExportedBands.AutoSize = true;
            this.lblExportedBands.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lblExportedBands.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblExportedBands.Location = new System.Drawing.Point(127, 155);
            this.lblExportedBands.Name = "lblExportedBands";
            this.lblExportedBands.Size = new System.Drawing.Size(99, 15);
            this.lblExportedBands.TabIndex = 18;
            this.lblExportedBands.Text = "And Exported to: ";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.ClientSize = new System.Drawing.Size(1048, 586);
            this.Controls.Add(this.dataGridView3);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.chartFFT);
            this.Controls.Add(this.bntAnalyze);
            this.Controls.Add(this.btnExport);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.btnDefault);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.btnCSV2);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.dataGridView2);
            this.Controls.Add(this.chart1);
            this.Controls.Add(this.chart2);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.menuStrip1);
            this.Name = "Form1";
            this.Text = "Brainwave Analyser";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.frequencyBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.myDatasetFrequency)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView2)).EndInit();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.openVibeDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.openVibeRawBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.openVibeDataSetFFT)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.openVibeRawBindingSourceFFT)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chartFFT)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView3)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart2;
        private System.Windows.Forms.Button btnCSV2;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart1;
        private OpenVibeDataSet openVibeDataSet;
        private System.Windows.Forms.BindingSource openVibeRawBindingSource;
        private OpenVibeDataSetTableAdapters.OpenVibeRawTableAdapter openVibeRawTableAdapter;
        private System.Windows.Forms.DataGridView dataGridView2;
        private OpenVibeDataSet openVibeDataSetFFT;
        private System.Windows.Forms.BindingSource openVibeRawBindingSourceFFT;
        private OpenVibeDataSetTableAdapters.OpenVibeRawTableAdapter openVibeRawTableAdapterFFT;
        private System.Windows.Forms.Button bntAnalyze;
        private System.Windows.Forms.Button btnExport;
        private System.Windows.Forms.Label lblSeconds;
        private System.Windows.Forms.Label lblLines;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem settingsToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem aboutToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem aboutToolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem helpToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem backgroundColorToolStripMenuItem;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.ColorDialog colorDialog1;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label lblImportFile;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button btnDefault;
        private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog1;
        private System.Windows.Forms.Label lblDefault;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Label lblExported;
        private System.Windows.Forms.ToolStripMenuItem setImportExportDefaultFolderToolStripMenuItem;
        private System.Windows.Forms.Label lblAnalyze;
        private System.Windows.Forms.DataVisualization.Charting.Chart chartFFT;
        private System.Windows.Forms.Button btnColor;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Button btnFrequency;
        private System.Windows.Forms.DataGridView dataGridView3;
        private System.Windows.Forms.Label lblExportedFreq;
        private System.Windows.Forms.BindingSource frequencyBindingSource;
        private OpenVibeDataSet1 myDatasetFrequency;
        private OpenVibeDataSetTableAdapters.OpenVibeRawTableAdapter mybleAdapterFrequency;
        private System.Windows.Forms.Button btnImportReader;
        private System.Windows.Forms.Button btnImportSine;
        private System.Windows.Forms.Label lblExportedBands;
    }
}

