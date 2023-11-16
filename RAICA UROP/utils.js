function linear_interpolation(a, b, f)
{
    // function to calculate intermediate values between the two ends of the road
    // a denotes the left side of the road
    // b denotes the right side of the road
    // f denotes what fraction of the road we want to occupy
    
    return a + (b-a) *f;
}