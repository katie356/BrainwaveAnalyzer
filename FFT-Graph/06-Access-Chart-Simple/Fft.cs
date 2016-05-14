/* 
 * Free FFT and convolution (C#)
 * 
 * Copyright (c) 2016 Project Nayuki
 * https://www.nayuki.io/page/free-small-fft-in-multiple-languages
 * 
 * (MIT License)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */


namespace _06_Access_Chart_Simple
{
    class Fft
    {

        public static void TransformRadix2(double[] real, double[] imag)
        {
            // Initialization
            if (real.Length != imag.Length)
                throw new System.ArgumentException("Mismatched lengths");
            int n = real.Length;
            int levels = 31 - NumberOfLeadingZeros(n);  // Equal to floor(log2(n))
            if (1 << levels != n)
                throw new System.ArgumentException("Length is not a power of 2");
            double[] cosTable = new double[n / 2];
            double[] sinTable = new double[n / 2];
            for (int i = 0; i < n / 2; i++)
            {
                cosTable[i] = System.Math.Cos(2 * System.Math.PI * i / n);
                sinTable[i] = System.Math.Sin(2 * System.Math.PI * i / n);
            }

            // Bit-reversed addressing permutation
            for (int i = 0; i < n; i++)
            {
                int j = (int)((uint)ReverseBits(i) >> (32 - levels));
                if (j > i)
                {
                    double temp = real[i];
                    real[i] = real[j];
                    real[j] = temp;
                    temp = imag[i];
                    imag[i] = imag[j];
                    imag[j] = temp;
                }
            }

            // Cooley-Tukey decimation-in-time radix-2 FFT
            for (int size = 2; size <= n; size *= 2)
            {
                int halfsize = size / 2;
                int tablestep = n / size;
                for (int i = 0; i < n; i += size)
                {
                    for (int j = i, k = 0; j < i + halfsize; j++, k += tablestep)
                    {
                        double tpre = real[j + halfsize] * cosTable[k] + imag[j + halfsize] * sinTable[k];
                        double tpim = -real[j + halfsize] * sinTable[k] + imag[j + halfsize] * cosTable[k];
                        real[j + halfsize] = real[j] - tpre;
                        imag[j + halfsize] = imag[j] - tpim;
                        real[j] += tpre;
                        imag[j] += tpim;
                    }
                }
                if (size == n)  // Prevent overflow in 'size *= 2'
                    break;
            }
        }


        private static int NumberOfLeadingZeros(int val)
        {
            if (val == 0)
                return 32;
            int result = 0;
            while (val >= 0)
            {
                val <<= 1;
                result++;
            }
            return result;
        }


        private static int ReverseBits(int val)
        {
            int result = 0;
            for (int i = 0; i < 32; i++, val >>= 1)
                result = (result << 1) | (val & 1);
            return result;
        }

    }
}
