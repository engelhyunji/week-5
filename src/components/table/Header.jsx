    import * as React from 'react';
    import PropTypes from 'prop-types';
    import Toolbar from '@mui/material/Toolbar';
    import IconButton from '@mui/material/IconButton';
    import SearchIcon from '@mui/icons-material/Search';
    import Typography from '@mui/material/Typography';
    import Link from '@mui/material/Link';

    function Header(props) {
    const { sections, title } = props;

    return (
        <React.Fragment>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#8e44ad' }}>
            {/* Adjust the backgroundColor value to the desired shade of purple (#8e44ad is a shade of purple) */}
            <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
            >
            {title}
            </Typography>
            <IconButton>
            <SearchIcon />
            </IconButton>
        </Toolbar>
        <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: 'space-between', overflowX: 'auto', backgroundColor: '#8e44ad' }}
            // Add the same backgroundColor value here for consistency
        >
            {sections.map((section) => (
            <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                sx={{ p: 1, flexShrink: 0 }}
            >
                {section.title}
            </Link>
            ))}
        </Toolbar>
        </React.Fragment>
    );
    }

    Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
    };

    export default Header;
