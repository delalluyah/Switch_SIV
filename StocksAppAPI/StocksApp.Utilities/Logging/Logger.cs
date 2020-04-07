using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace StocksApp.Utilities.Logging
{
    public class Logger
    {
        public static bool VerboseLogging { get; set; }
        private static readonly object Locker = new object();
        private readonly string _logDirectory;
        private string _infoLogDirectory;
        private string _succesLogDirectory;
        private string _errorLogDirectory;
        private string _warningLogDirectory;
        private string ROOT_Directory = Path.Combine(Environment.CurrentDirectory, "logs");

        public Logger()
        {
            
            _errorLogDirectory =Path.Combine(ROOT_Directory,"Error");
            _infoLogDirectory = Path.Combine(ROOT_Directory, "Info");
            _warningLogDirectory = Path.Combine(ROOT_Directory,"Warning");
            _succesLogDirectory = Path.Combine(ROOT_Directory,"Success");
        }
        public void logError(Exception x)
        {
            try
            {
                var dir = Path.Combine(_errorLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                CheckDir(dir);
                dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                CheckDir(dir);
                var message = x.ToString() + "\r\n" + x.StackTrace + "\r\n----------END----------";
                using (var sw = new StreamWriter(Path.Combine(dir,
                    string.Format("CLF_error_{0}_{1}.log", DateTime.Now.ToString("HHmmss"),
                    new Random().Next(100000, 999999))), true))
                {
                    sw.WriteLine(message);
                }
            }
            catch
            {
                // ignored
            }
        }

        public void logError(string msisdn, Exception x)
        {
            try
            {
                var dir = Path.Combine(_errorLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                CheckDir(dir);
                dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                CheckDir(dir);
                var message = x.ToString() + "\r\n" + x.StackTrace + "\r\n----------END----------";
                using (var sw = new StreamWriter(Path.Combine(dir,
                    string.Format("{0}_CLF_error_{1}_{2}.log", msisdn, DateTime.Now.ToString("HHmmss"),
                    new Random().Next(100000, 999999))), true))
                {
                    sw.WriteLine(message);
                }
            }
            catch
            {
                // ignored
            }
        }

        public void logError(string message)
        {
            try
            {
                var dir = Path.Combine(_errorLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                CheckDir(dir);
                dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                CheckDir(dir);
                message += "\r\n--------------------";
                using (var sw = new StreamWriter(Path.Combine(dir,
                    string.Format("CLF_Error_{0}_{1}.log", DateTime.Now.ToString("HHmmss"),
                    new Random().Next(100000, 999999))), true))
                {
                    sw.WriteLine(message);
                }
            }
            catch
            {
                // ignored
            }
        }

        public void logInfo(string message)
        {
            try
            {
                var dir = Path.Combine(_infoLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                CheckDir(dir);
                dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                CheckDir(dir);
                message += "\r\n--------------------";
                using (var sw = new StreamWriter(Path.Combine(dir,
                    string.Format("CLF_Info_{0}_{1}.log", DateTime.Now.ToString("HHmmss"),
                    new Random().Next(100000, 999999))), true))
                {
                    sw.WriteLine(message);
                }
            }
            catch
            {
                // ignored
            }
        }

        public void logSuccess(string title, string message)
        {
            try
            {
                var dir = Path.Combine(_infoLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                CheckDir(dir);
                dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                CheckDir(dir);
                message += "\r\n--------------------";
                using (var sw = new StreamWriter(Path.Combine(dir,
                    string.Format("SUCCESS_{0}_{1}.log", DateTime.Now.ToString("HHmmss"),
                    new Random().Next(100000, 999999))), true))
                {
                    sw.WriteLine(message);
                }
            }
            catch
            {
                // ignored
            }
        }

        public void logInfo(string msisdn, string message)
        {
            try
            {
                var dir = Path.Combine(_infoLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                CheckDir(dir);
                dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                CheckDir(dir);
                message += "\r\n--------------------";
                using (var sw = new StreamWriter(Path.Combine(dir,
                    string.Format("{0}_CLF_Info_{1}_{2}.log", msisdn, DateTime.Now.ToString("HHmmss"),
                    new Random().Next(100000, 999999))), true))
                {
                    sw.WriteLine(message);
                }
            }
            catch
            {
                // ignored
            }
        }

        public void logInfo(string filename, string msisdn, string message)
        {
            try
            {
                var dir = Path.Combine(_infoLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                CheckDir(dir);
                dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                CheckDir(dir);
                message += "\r\n--------------------";
                using (var sw = new StreamWriter(Path.Combine(dir, filename), true))
                {
                    sw.WriteLine(string.Format("{0:HH-mm-ss} {1} {2}", DateTime.Now, msisdn, message));
                }
            }
            catch
            {
                // ignored
            }
        }

        public void logWarning(string msisdn, string message)
        {
            lock (Locker)
            {
                try
                {
                    var dir = Path.Combine(_warningLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                    CheckDirStatic(dir);
                    dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                    CheckDirStatic(dir);
                    message += "\r\n--------------------";
                    using (var sw = new StreamWriter(Path.Combine(dir,
                    string.Format("{2}_CLF_Warning_{0}_{1}.log", DateTime.Now.ToString("HHmmssfff"),
                    new Random().Next(100000, 999999), msisdn)), true))
                    {
                        sw.WriteLineAsync(message);
                    }
                }
                catch
                {
                    // ignored
                }
            }
        }

        public void logWarning(string message)
        {
            lock (Locker)
            {
                try
                {
                    var dir = Path.Combine(_warningLogDirectory, DateTime.Now.ToString("yyyy_MM_dd"));
                    CheckDirStatic(dir);
                    dir = Path.Combine(dir, DateTime.Now.ToString("HH"));
                    CheckDirStatic(dir);
                    message += "\r\n--------------------";
                    using (var sw = new StreamWriter(Path.Combine(dir,
                    string.Format("{2}_CLF_Warning_{0}_{1}.log", DateTime.Now.ToString("HHmmssfff"),
                    new Random().Next(100000, 999999), DateTime.Now.ToString("HHmmssfff"))), true))
                    {
                        sw.WriteLineAsync(message);
                    }
                }
                catch
                {
                    // ignored
                }
            }
        }

        public void CheckDir(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }


        private static void CheckDirStatic(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }
    }

}
