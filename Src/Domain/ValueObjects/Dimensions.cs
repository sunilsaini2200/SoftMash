
using Domain.Common;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.ValueObjects
{
    public class Dimensions : ValueObject
    {
        const char SEPARATOR = 'x';

        private Dimensions()
        {
        }
        public Dimensions(decimal width, decimal height, decimal length)
        {
            Width = width;
            Height = height;
            Length = length;
        }
        public static Dimensions For(string dimensionsString)
        {
            var dimensions = new Dimensions();

            try
            {
                var split = dimensionsString.Split(SEPARATOR);
                dimensions.Width = decimal.Parse(split[0]);
                dimensions.Height = decimal.Parse(split[1]);
                dimensions.Width = decimal.Parse(split[2]);
            }
            catch (Exception ex)
            {
                throw new DimensionsInvalidException(dimensionsString, ex);
            }
            return dimensions;
        }
        public decimal Width { get; private set; }
        public decimal Height { get; private set; }
        public decimal Length { get; private set; }
        public static implicit operator string(Dimensions dimensions)
        {
            return dimensions.ToString();
        }
        public static explicit operator Dimensions(string dimensionsString)
        {
            return For(dimensionsString);
        }
        public override string ToString()
        {
            return $"{Width}{SEPARATOR}{Height}{SEPARATOR}{Length}";
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Width;
            yield return Height;
            yield return Length;
        }
    }
}
